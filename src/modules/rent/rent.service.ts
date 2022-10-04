import { NotificationTypeEnum } from './../notification/enums/notification-type.enum';
import { NotificationService } from './../notification/notification.service';
import { Book } from './../book/schemas/book.schema';
import { QueryArgsInput } from 'src/common/inputs/query-args.input';
import { UpdateRentStatusInput } from './inputs/update-rent-status.input';
import { CreateRentInput } from './inputs/create-rent.input';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BookService } from '../book/book.service';
import { Rent } from './schemas/rent.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RentStatusEnum } from './enums/rent-status.enum';
import { PubSubService } from '../pubsub/pubsub.service';

@Injectable()
export class RentService {
  constructor(
    private readonly bookService: BookService,
    private readonly pubSubService: PubSubService,
    private readonly notification: NotificationService,
    @InjectModel(Rent.name) private readonly rentSchema: Model<Rent>,
    @InjectModel(Book.name) private readonly bookSchema: Model<Book>,
  ) {}

  async findByCondition(condition: any): Promise<Rent[]> {
    return await this.rentSchema.find({ condition });
  }

  async findById(id: string): Promise<Rent> {
    return await this.rentSchema.findById(id);
  }

  async findByIds(ids: string[]) {
    return await this.rentSchema.find({ _id: { $in: ids } });
  }

  async findAll(queryArgsInput?: QueryArgsInput) {
    return await this.rentSchema.find(
      {},
      {},
      { limit: queryArgsInput.limit, skip: queryArgsInput.skip },
    );
  }

  async create(
    userId: string,
    createRentInput: CreateRentInput,
  ): Promise<Rent> {
    const { bookIds } = createRentInput;
    const existedBooks = await this.bookService.findByIds(bookIds);

    if (existedBooks.length === 0) {
      throw new BadRequestException('Books are not existed');
    }

    const existedBookIds = existedBooks.map((book) => book._id.toString());

    const rent = await this.rentSchema.create({
      userId,
      bookIds: existedBookIds,
    });

    const notification = await this.notification.create({
      type: NotificationTypeEnum.RENT_CREATED,
      entityId: rent._id,
    });
    await this.pubSubService.registerEvent('rentCreated', { notification });

    return rent;
  }

  async updateStatusById(
    updateRentStatusInput: UpdateRentStatusInput,
  ): Promise<Rent> {
    const { rentId, updateStatus } = updateRentStatusInput;
    const rent = await this.findById(rentId);

    if (!rent) {
      throw new NotFoundException(`Rent with ID ${rentId} does not exist`);
    }

    const bookIds = rent.bookIds;
    const availableBooks = await this.bookSchema.find({
      _id: { $in: bookIds },
      available: { $gt: 0 },
    });
    const availableBookIds = availableBooks.map((book) => book._id.toString());

    let notificationType: NotificationTypeEnum;

    switch (updateStatus) {
      case RentStatusEnum.ACCEPTED:
        if (rent.status !== RentStatusEnum.PROCESSING) {
          throw new BadRequestException(
            'Only PROCESSING rent can be updated to PLACED',
          );
        }

        if (availableBookIds.length === 0) {
          throw new BadRequestException('Books are not available');
        }

        // Update book available number
        await this.bookSchema.updateMany(
          { _id: { $in: availableBookIds } },
          { $inc: { available: -1 } },
        );

        notificationType = NotificationTypeEnum.RENT_ACCEPTED;

        break;

      case RentStatusEnum.DENIED:
        if (rent.status !== RentStatusEnum.PROCESSING) {
          throw new BadRequestException(
            'Only PROCESSING rent can be updated to DENIED',
          );
        }

        notificationType = NotificationTypeEnum.RENT_DENIED;

        break;

      case RentStatusEnum.DONE:
        if (rent.status !== RentStatusEnum.ACCEPTED) {
          throw new BadRequestException(
            'Only ACCEPTED rent can be updated to DONE',
          );
        }

        // Update book available number
        await this.bookSchema.updateMany(
          { _id: { $in: availableBookIds } },
          { $inc: { available: 1 } },
        );

        break;

      default:
        throw new BadRequestException(
          'ACCEPTED, DENIED and DONE status are required',
        );
    }

    const updatedRent = await this.rentSchema.findOneAndUpdate(
      { _id: rentId },
      { $set: { status: updateStatus } },
      {
        new: true,
      },
    );

    const notification = await this.notification.create({
      type: notificationType,
      entityId: updatedRent._id,
    });
    await this.pubSubService.registerEvent('rentUpdated', {
      notification,
      userIdOnRent: rent.userId,
    });

    return updatedRent;
  }
}

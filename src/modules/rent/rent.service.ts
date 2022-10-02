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

@Injectable()
export class RentService {
  constructor(
    private readonly bookService: BookService,
    @InjectModel(Rent.name) private readonly rentSchema: Model<Rent>,
  ) {}

  async findById(id: string): Promise<Rent> {
    return await this.rentSchema.findById(id);
  }

  async findByIds(ids: string[]) {
    return await this.rentSchema.find({ _id: { $in: ids } }).populate([
      {
        path: 'userId',
      },
      {
        path: 'bookIds',
        populate: { path: 'categoryId' },
      },
    ]);
  }

  async findAll(queryArgsInput?: QueryArgsInput) {
    return await this.rentSchema
      .find({}, {}, { limit: queryArgsInput.limit, skip: queryArgsInput.skip })
      .populate([
        {
          path: 'userId',
        },
        {
          path: 'bookIds',
          populate: { path: 'categoryId' },
        },
      ]);
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

    return await (
      await this.rentSchema.create({ userId, bookIds: existedBookIds })
    ).populate([
      {
        path: 'userId',
      },
      {
        path: 'bookIds',
        populate: { path: 'categoryId' },
      },
    ]);
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
    const availableBooks = await this.bookService.findByCondition({
      _id: { $in: bookIds },
      available: { $gt: 0 },
    });
    const availableBookIds = availableBooks.map((book) => book._id.toString());

    switch (updateStatus) {
      case RentStatusEnum.ACCEPTED:
        if (rent.status !== RentStatusEnum.PROCESSING) {
          throw new BadRequestException(
            'Only PROCESSING rent can be updated to PLACED',
          );
        }

        // Update book available number
        await this.bookService.updateMany(
          { _id: { $in: availableBookIds } },
          { available: { $inc: -1 } },
        );

        break;

      case RentStatusEnum.DENIED:
        if (rent.status !== RentStatusEnum.PROCESSING) {
          throw new BadRequestException(
            'Only PROCESSING rent can be updated to DENIED',
          );
        }

        break;

      case RentStatusEnum.DONE:
        if (rent.status !== RentStatusEnum.ACCEPTED) {
          throw new BadRequestException(
            'Only ACCEPTED rent can be updated to DONE',
          );
        }

        // Update book available number
        await this.bookService.updateMany(
          { _id: { $in: availableBookIds } },
          { available: { $inc: 1 } },
        );

        break;

      default:
        throw new BadRequestException(
          'ACCEPTED, DENIED and DONE status are required',
        );
    }

    return await this.rentSchema
      .findOneAndUpdate(
        { _id: rentId },
        { $set: { status: updateStatus } },
        {
          new: true,
        },
      )
      .populate([
        {
          path: 'userId',
        },
        {
          path: 'bookIds',
          populate: { path: 'categoryId' },
        },
      ]);
  }
}

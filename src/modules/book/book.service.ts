import { CreateBookInput } from './inputs/create-book.input';
import { CategoryService } from './../category/category.service';
import { Book } from './schemas/book.schema';
import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MediaService } from '../media/media.service';
import { QueryArgsInput } from 'src/common/inputs/query-args.input';
import { PubSubService } from '../pubsub/pubsub.service';
import { NotificationService } from '../notification/notification.service';
import { NotificationTypeEnum } from '../notification/enums/notification-type.enum';
import { User } from '../user/schemas/user.schema';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<Book>,
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly categoryService: CategoryService,
    private readonly mediaService: MediaService,
    private readonly pubSubService: PubSubService,
    private readonly notificationService: NotificationService,
  ) {}

  async findByTitle(title: string): Promise<Book> {
    return await this.bookModel.findOne({ title });
  }

  async findById(id: string): Promise<Book> {
    return await this.bookModel.findById(id);
  }

  async findByIds(ids: string[]): Promise<Book[]> {
    return await this.bookModel.find({ _id: { $in: ids } });
  }

  async findByCondition(condition: any): Promise<Book[]> {
    return await this.bookModel.find({ condition });
  }

  async create(createBookInput: CreateBookInput): Promise<Book> {
    const { categoryId, mediaId, title } = createBookInput;

    if (!(await this.categoryService.findById(categoryId))) {
      throw new BadRequestException(
        `Category with ID ${categoryId} does not exist`,
      );
    }

    if (!(await this.mediaService.findById(mediaId))) {
      throw new BadRequestException(`Media with ID ${mediaId} does not exist`);
    }

    if (await this.findByTitle(title)) {
      throw new ConflictException(`Book with title ${title} is already exist`);
    }

    const book = await this.bookModel.create(createBookInput);

    const notification = await this.notificationService.create({
      type: NotificationTypeEnum.BOOK_ADDED,
      entityId: book._id,
    });
    const usersApplyReceiveNewBookInfo = await this.userModel.find({
      isApplyReceiveNewBookInfo: true,
    });
    const userIdsApplyReceiveNewBookInfo = usersApplyReceiveNewBookInfo.map(
      (user) => user._id.toString(),
    );
    console.log(userIdsApplyReceiveNewBookInfo);

    await this.pubSubService.registerEvent('bookAdded', {
      notification,
      userIdsApplyReceiveNewBookInfo,
    });

    return book;
  }

  async findAll(queryArgsInput?: QueryArgsInput): Promise<Book[]> {
    return await this.bookModel.find(
      {},
      {},
      {
        limit: queryArgsInput?.limit,
        skip: queryArgsInput?.skip,
      },
    );
  }
}

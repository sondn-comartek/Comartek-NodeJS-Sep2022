import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as dayjs from 'dayjs';
import { Model } from 'mongoose';
import { BooksService } from 'src/module/books/books.service';
import { RentBookInput } from 'src/module/users/dto/rent-book.input';
import { CreateRentInput } from './dto/create-rent.input';
import { UpdateRentInput } from './dto/update-rent.input';
import { RentBook } from './entities/rent.entity';
import { PubSub } from 'graphql-subscriptions';
import { PubsubService } from '../pubsub/pubsub.service';
import { NotificationType } from '../notification/enums/notification-type.enum';
import { NotificationService } from '../notification/notification.service';
import { NotificationMsg } from '../notification/enums/notification-msg.enum';

enum RentBookStatus {
  PENDING = "Pending",
  APPROVED = "Approved",
  REJECTED = "Rejected"
}

export const pubSub = new PubSub();

@Injectable()
export class RentService {
  constructor(
    @InjectModel('RentBook') private readonly rentBook: Model<RentBook>,
    private readonly booksService: BooksService,
    private readonly pubSubService: PubsubService,
    private readonly notificationService: NotificationService
  ) {}

  async processRentBook(userId: string, rentBookInput: RentBookInput): Promise<RentBook> {
    const { bookId, rentTime } = rentBookInput;
    const book = await this.booksService.findById(bookId);
    

    // Check book is available or not
    if (book.availableBook > 1) {
      book.availableBook--;
    } else {
      throw new Error('This book is not available for rent');
    }

    const newRentBook = {
      user: userId,
      book: bookId,
      status: RentBookStatus.PENDING,
      startTime: dayjs().format()
    }
    const createdRentBook = await this.rentBook.create(newRentBook);
    if (!createdRentBook) {
      throw new Error(`Can not create a new RentBook`);
    }
    await book.save();
    const notification = await this.notificationService.create(NotificationType.BOOK_RENT, NotificationMsg.BOOK_RENT);
    notification['data'] = createdRentBook._id;
    this.pubSubService.publicEvent(NotificationType.BOOK_RENT, notification);
    return createdRentBook;
  }

  async approvedRentBook(id: string): Promise<RentBook> {
    const rentBook = await this.rentBook.findOne({ _id: id });
    if (!rentBook) {
      throw new HttpException(`A rent book with id ${id} not found`, HttpStatus.NOT_FOUND);
    }

    if (rentBook.status === RentBookStatus.APPROVED || rentBook.status === RentBookStatus.REJECTED) {
      console.log("Rent book is already approved/rejected. Can not approve this rent.");
      return rentBook;
    }

    rentBook.status = RentBookStatus.APPROVED;
    rentBook.expiredTime = dayjs().add(2, 'day').format();

    await rentBook.save();
    const notification = await this.notificationService.create(NotificationType.RENT_ACCEPTED, NotificationMsg.RENT_ACCEPTED);
    notification['data'] = rentBook._id;
    this.pubSubService.publicEvent(NotificationType.RENT_ACCEPTED, notification);
    return rentBook;
  }

  async rejectedRentBook(id: string): Promise<RentBook> {
    const rentBook = await this.rentBook.findOne({ _id: id });
    if (!rentBook) {
      throw new HttpException(`A rent book with id ${id} not found`, HttpStatus.NOT_FOUND);
    }

    if (rentBook.status === RentBookStatus.APPROVED || rentBook.status === RentBookStatus.REJECTED) {
      console.log("Rent book is already approved/rejected. Can not reject this rent.");
      return rentBook;
    }

    rentBook.status === RentBookStatus.REJECTED;
    rentBook.expiredTime = rentBook.startTime;

    await rentBook.save();
    const notification = await this.notificationService.create(NotificationType.RENT_REJECTED, NotificationMsg.RENT_REJECTED);
    notification['data'] = rentBook._id;
    this.pubSubService.publicEvent(NotificationType.RENT_REJECTED, notification);
    return rentBook;
  }

  async findById(id: string): Promise<RentBook> {
    console.log(id)
    const rentBook = await this.rentBook.findOne({ _id: id });
    if (!rentBook) {
      throw new HttpException("Error in get a rent book", HttpStatus.BAD_REQUEST);
    }
    return rentBook;
  }

  async findByIds(idList: string[]): Promise<RentBook[]> {
    const rentBookList = await this.rentBook.find({
      user: { $in: idList }
    });
    if (!rentBookList) {
      throw new HttpException("Error in get rentBook list", HttpStatus.BAD_REQUEST);
    }
    return rentBookList;
  }

  async countRentById(id: string): Promise<Number> {
    const countRent = await this.rentBook.countDocuments({ user : id });
    if (!countRent) {
      throw new HttpException(`Error int get count rent by id${id}`, HttpStatus.BAD_REQUEST);
    }
    return countRent;
  }

  async findAllRent() {
    const rentList = await this.rentBook.find().populate([
      {
        path: 'user'
      },
      {
        path: 'book',
        populate: {
          path: 'categoryId'
        }
      }
    ]);
    if (!rentList) {
      throw new HttpException('Error in getting rent list', HttpStatus.BAD_REQUEST);
    }
    return rentList;
  }

  findOne(id: number) {
    return `This action returns a #${id} rent`;
  }

  update(id: number, updateRentInput: UpdateRentInput) {
    return `This action updates a #${id} rent`;
  }

  remove(id: number) {
    return `This action removes a #${id} rent`;
  }
}

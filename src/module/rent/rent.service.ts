import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import moment from 'moment';
import { Model } from 'mongoose';
import { BooksService } from 'src/module/books/books.service';
import { RentBookInput } from 'src/module/users/dto/rent-book.input';
import { CreateRentInput } from './dto/create-rent.input';
import { UpdateRentInput } from './dto/update-rent.input';
import { RentBook } from './entities/rent.entity';

enum RentBookStatus {
  PENDING = "Pending",
  APPROVED = "Approved"
}

@Injectable()
export class RentService {
  constructor(
    @InjectModel('RentBook') private readonly rentBook: Model<RentBook>,
    private readonly booksService: BooksService
  ) {}

  async processRentBook(userId: string, rentBookInput: RentBookInput): Promise<RentBook> {
    const { bookId, rentTime } = rentBookInput;
    const book = await this.booksService.findOne(bookId);
    

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
      startTime: moment().format()
    }
    const createdRentBook = await this.rentBook.create(newRentBook);
    if (!createdRentBook) {
      throw new Error(`Can not create a new RentBook`);
    }
    await book.save();
    return createdRentBook;
  }

  async approvedRentBook(id: string): Promise<RentBook> {
    const rentBook = await this.rentBook.findOne({ id: id });
    if (!rentBook) {
      throw new HttpException(`A rent book with id ${id} not found`, HttpStatus.NOT_FOUND);
    }

    if (rentBook.status === RentBookStatus.APPROVED) {
      console.log("Rent book is already approved");
      return rentBook;
    }

    rentBook.status = RentBookStatus.APPROVED;
    rentBook.expiredTime = moment().add(2, 'days').format();

    await rentBook.save()
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

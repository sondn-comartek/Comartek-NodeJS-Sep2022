import { UpdateRentStatusInput } from './inputs/update-rent-status.input';
import { CreateRentInput } from './inputs/create-rent.input';
import { BadRequestException, Injectable } from '@nestjs/common';
import { BookService } from '../book/book.service';
import { Rent } from './schemas/rent.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class RentService {
  constructor(
    private readonly bookService: BookService,
    @InjectModel(Rent.name) private readonly rentSchema: Model<Rent>,
  ) {}

  async findById() {}

  async findByIds() {}

  async findAll() {}

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
    
    return;
  }
}

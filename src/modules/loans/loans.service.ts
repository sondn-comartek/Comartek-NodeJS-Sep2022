import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StatusBookItem } from '../book-items/enums/status.enum';
import {
  BookItem,
  BookItemDocument,
} from '../book-items/entities/book-item.entity';
import { User, UserDocument } from '../users/entities/user.entity';
import { CreateLoanInput } from './dto/create-loan.input';
import { UpdateLoanInput } from './dto/update-loan.input';
import { Loan, LoanDocument } from './entities/loan.entity';
import { PubsubService } from '../pubsub/pubsub.service';

@Injectable()
export class LoansService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    @InjectModel(BookItem.name)
    private readonly bookItemModel: Model<BookItemDocument>,
    @InjectModel(Loan.name)
    private readonly loanModel: Model<LoanDocument>,
    private readonly pubsubService: PubsubService,
  ) {}

  async create(createLoanInput: CreateLoanInput) {
    try {
      const { userId, bookItemId } = createLoanInput;
      const userExist = await this.userModel.findOne({ id: userId });
      if (!userExist) return new Error(`This user does not exist`);

      const bookItemExist = await this.bookItemModel.findOne({
        id: bookItemId,
      });
      if (!bookItemExist) {
        await this.pubsubService.publishEvent('responseBorrow', {
          responseBorrow:
            'This book item does not exist. You can not borrow this book',
        });
        return new Error(`This book item does not exist`);
      }

      const bookItemAvailable =
        bookItemExist.status === 'available' ? true : false;
      if (!bookItemAvailable) {
        await this.pubsubService.publishEvent('responseBorrow', {
          responseBorrow:
            'Book item is not available. You can not borrow this book',
        });
        return new Error(`Book item is not available`);
      }

      const loanExist = await this.loanModel.findOne({ userId, bookItemId });
      if (loanExist) {
        await this.pubsubService.publishEvent('responseBorrow', {
          responseBorrow:
            'This loan already exists. You can not borrow this book',
        });
        return new Error(`This loan already exists`);
      }

      await this.pubsubService.publishEvent('responseBorrow', {
        responseBorrow: 'You can borrow this book',
      });

      await this.bookItemModel.findOneAndUpdate(
        { id: bookItemId },
        { $set: { status: StatusBookItem.Unavailable } },
        {
          new: true,
        },
      );

      return await new this.loanModel({
        ...createLoanInput,
      }).save();
    } catch (e) {
      throw new Error(e);
    }
  }

  async getTotalBorrowed() {
    const totalBorrowedBook = await this.loanModel.aggregate([
      { $match: { status: 'borrowing' } },
      {
        $count: 'total',
      },
    ]);

    return totalBorrowedBook[0].total;
  }

  async getBorrowedByBookId(bookId: string): Promise<number> {
    const totalBorrowedBook = await this.bookItemModel.aggregate([
      { $match: { $and: [{ bookId: bookId }, { status: 'unavailable' }] } },
      {
        $count: 'total',
      },
    ]);
    return totalBorrowedBook[0]?.total || 0;
  }

  async countLoanByUserId(userId: string) {
    return await this.loanModel.find({ userId }).count();
  }

  async getLoansByBatch(userIds: string[]): Promise<(Loan | any)[]> {
    const loans = await this.loanModel.find({ userId: { $in: userIds } });
    const mappedLoans = userIds.map(
      (userId) => loans.filter((loan) => loan.userId === userId) || null,
    );
    // console.log('mappedLoans', mappedLoans);
    return mappedLoans;
  }

  async findAll() {
    return await this.loanModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} loan`;
  }

  update(id: number, updateLoanInput: UpdateLoanInput) {
    return `This action updates a #${id} loan`;
  }

  remove(id: number) {
    return `This action removes a #${id} loan`;
  }
}

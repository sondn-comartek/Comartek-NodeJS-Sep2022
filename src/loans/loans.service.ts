import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  BookItem,
  BookItemDocument,
} from 'src/book-items/schemas/book-item.schema';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { CreateLoanInput } from './dto/create-loan.input';
import { UpdateLoanInput } from './dto/update-loan.input';
import { Loan, LoanDocument } from './schemas/loan.schema';

@Injectable()
export class LoansService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    @InjectModel(BookItem.name)
    private readonly bookItemModel: Model<BookItemDocument>,
    @InjectModel(Loan.name)
    private readonly loanModel: Model<LoanDocument>,
  ) {}

  async create(createLoanInput: CreateLoanInput) {
    const { userId, bookItemId } = createLoanInput;
    const userExist = await this.userModel.findOne({ id: userId });
    if (!userExist) return new Error(`This user does not exist`);

    const bookItemExist = await this.bookItemModel.findOne({ id: bookItemId });
    if (!bookItemExist) return new Error(`This book item does not exist`);

    const bookItemAvailable =
      bookItemExist.status === 'available' ? true : false;
    if (!bookItemAvailable) return new Error(`Book item is not available`);

    const loanExist = await this.loanModel.findOne({ userId, bookItemId });
    if (loanExist) return new Error(`This loan already exists`);

    return await new this.loanModel({
      ...createLoanInput,
    }).save();
  }

  async countLoanByUserId(userId: string) {
    return await this.loanModel.find({ userId }).count();
  }

  async getLoansByBatch(userIds: string[]): Promise<(Loan | any)[]> {
    const totalBookBorrowed = await this.loanModel
      .find({ userId: { $in: userIds } })
      .count();

    console.log('total>>>>', totalBookBorrowed);
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

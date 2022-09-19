import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { DiscountDocument } from './schemas/discount.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel("discount") private discountModel: Model<DiscountDocument>
    ) {}

  @Cron('0 0 0 * * 5')
  async handleDiscount() {
    await this.discountModel.updateOne({_id : "6327f6846f7246f80f5b752e"}, {$set: {percent: 0.5}})
    console.log("start halve")
  }
  @Cron('0 0 12 * * 5')
  async handleRemvoeDiscount() {
    await this.discountModel.updateOne({_id : "6327f6846f7246f80f5b752e"}, {$set: {percent: 0}})
    console.log("end halve")
  }
}
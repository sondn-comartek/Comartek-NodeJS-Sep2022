import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron } from '@nestjs/schedule';
import { Model } from 'mongoose';
import { Rate } from '../common/entities';

@Injectable()
export class DiscountService {
  constructor(@InjectModel(Rate.name) private rateEntity: Model<Rate>) {}

  @Cron('0 0 * * 5')
  async activeDiscount50PercentForAllRate() {
    await this.rateEntity.updateMany({}, { $set: { discount: 0.5 } });
    console.log('Cập nhập: Giảm 50% giá ship');
  }

  @Cron('0 12 * * 5')
  async deactiveDiscount50PercentForAllRate() {
    await this.rateEntity.updateMany({}, { $set: { discount: 1 } });
    console.log('Cập nhập: Thu hồi giảm giá 50%');
  }
}

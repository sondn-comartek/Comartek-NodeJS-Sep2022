import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron } from '@nestjs/schedule';
import { Model } from 'mongoose';
import { Rate } from '../common/entities';

@Injectable()
export class DiscountService {
    constructor(@InjectModel(Rate.name) private rateEntity: Model<Rate>) { }

    @Cron('0 0 * * 5')
    async activeDiscount50PercentForAllRate() {
        const rates = await this.rateEntity.find({}).select("weight price -_id");
        for (const rate of rates) {
            await this.rateEntity.updateOne({
                where: {
                    weight: rate.weight
                }
            }, {
                $set: {
                    price: rate.price / 2
                }
            })
        }
    }

    @Cron('0 12 * * 5')
    async deactiveDiscount50PercentForAllRate() {
        const rates = await this.rateEntity.find({}).select("weight -_id");
        for (const rate of rates) {
            await this.rateEntity.updateOne({
                where: {
                    weight: rate.weight
                }
            }, {
                $set: {
                    price: rate.price * 2
                }
            })
        }
    }
}

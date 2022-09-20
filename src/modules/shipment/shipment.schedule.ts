import { Injectable, Logger } from "@nestjs/common";
import { Cron , CronExpression} from "@nestjs/schedule"
import { Discount } from "./constant";
import { Rate } from "./interfaces";
import { RateRepository } from "./repositories";

@Injectable()
export class ShipmentSchedule{
    private logger = new Logger( ShipmentSchedule.name )
    constructor(private readonly RateRepository: RateRepository){
    }
    async ReinventRateTask(volumn: number):Promise<any> {
        const Rates = await this.RateRepository.FindAll({})
        Rates.forEach( async ( rate: Rate ) => {
            rate.price = rate.price * volumn
            await this.RateRepository.Create(rate)
        }) 
        return this.logger.debug(`Reinvent ${volumn * 100}% rate successfull`)
    }
    @Cron("0 0 12 * * 5", {
        name : 'decrease rate'
    })
    DecreaseRate():Promise<Logger> | any {
        return this.ReinventRateTask(Discount.FIFTY_PERCENT)
    }
    
    @Cron("0 0 0 * * 6", {
        name : 'increase rate'
    })
    IncreaseRate():Promise<Logger> | any{
        return this.ReinventRateTask(2) 
    }
}
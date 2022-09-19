import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { QuoteService } from '../quote/quote.service';

const DEFAULT_FRIDAY_SALE_NAME = "Friday's Sale";

@Injectable()
export class CronService {
    constructor(
        private readonly quoteService: QuoteService,
    ) {}
    private readonly logger = new Logger(CronService.name);

    @Cron('0 12 * * 5')
    async startFridaySale() {
        const result = await this.quoteService.updateReductionFactor(DEFAULT_FRIDAY_SALE_NAME, true);
        if (result === true) {
            this.logger.debug("Start Friday's Sale successfully");
        } else {
            this.logger.debug("Start Friday's Sale failed");
        }
    }

    @Cron('0 0 * * 6')
    async endFridaySale() {
        const result = await this.quoteService.updateReductionFactor(DEFAULT_FRIDAY_SALE_NAME, false);
        if (result === true) {
            this.logger.debug("End Friday's Sale successfully");
        } else {
            this.logger.debug("End Friday's Sale failed");
        }
    }
}

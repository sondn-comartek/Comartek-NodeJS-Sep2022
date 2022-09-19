import { Module } from '@nestjs/common';
import { QuoteModule } from 'src/quote/quote.module';
import { CronService } from './cron.service';

@Module({
    imports: [
        QuoteModule
    ],
    providers: [CronService],
})
export class CronModule {}

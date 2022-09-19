import { Injectable } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';

@Injectable()
export class TaskSchedulingService {
    @Interval(1000)
    log() {
        console.log("LOG TASK")
    }
}

import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
@Injectable()
export class UserCSVPushlish {
  constructor( @InjectQueue('usercsv') private usercsv: Queue,
              ) {

  }
  async pushUserCSV(id: string) {
    this.usercsv.add({
      id: id
    })
  }
}

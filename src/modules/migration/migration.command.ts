import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../user/schemas/user.schema';

@Injectable()
export class MigrationCommand {
  constructor() {}
}

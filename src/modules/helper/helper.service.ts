import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'src/modules/schema/user.schema';
import * as Excel from 'exceljs';
import * as path from 'path';
import {v4} from 'uuid'
@Injectable()
export class HelperService {
  constructor(@InjectModel('user') private userModel: Model<UserDocument>) {}
  async genUserCSVfile() {
    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet('Users');
    const users: Array<UserDocument> = await this.userModel.find({})
    
    worksheet.columns = [
      { key: 'username', header: 'User Name' },
      { key: 'firstname', header: 'First Name'},
      { key: 'lastname', header: 'Lastname' },
      { key: 'email', header: 'Email' },
      { key: 'phone', header: 'Phone' },
      { key: 'role', header: 'Role' },
    ];
    users.forEach(async user => {
      worksheet.addRow(user);
    });
    const dir = __dirname+"/../../../csv/"
    const random = v4()
    const exportPath = path.resolve(dir, `${random}.xlsx`);
    await workbook.xlsx.writeFile(exportPath);
    return random
  }
  
  
}

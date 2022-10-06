import { Injectable } from '@nestjs/common';
import { Workbook } from 'exceljs';

@Injectable()
export class ExcelService {
  constructor() {}

  async createExcelFile(data: any[], media): Promise<Workbook> {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('EXTRACTED DATA');

    const dataFieldName = Object.keys(data[0]);
    const dataColumns = [];
    for (const fieldName of dataFieldName) {
      dataColumns.push({
        key: fieldName?.toString(),
        header: fieldName?.toString()?.toUpperCase(),
      });
    }
    worksheet.columns = dataColumns;

    data.forEach((d) => worksheet.addRow(d));

    await workbook.xlsx.writeFile(
      `store/excel/${media._id.toString()}.${media.mimetype}`,
    );

    return;
  }
}

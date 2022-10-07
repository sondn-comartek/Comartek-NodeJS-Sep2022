import { BookStatus } from 'src/modules/book/enums/status.enum';
import { Injectable } from '@nestjs/common';
import * as ExcelJS from 'exceljs';
import * as _ from 'lodash';

// @Injectable()
export class Excel {
  private workbook = new ExcelJS.Workbook();
  private data = [];
  private title = '';
  private filename = '';
  constructor(title, data, filename) {
    this.workbook.creator = 'NguyenLing';
    this.workbook.lastModifiedBy = 'Me';
    this.workbook.created = new Date();
    this.workbook.modified = new Date();
    this.workbook.lastPrinted = new Date();
    this.title = title;
    this.data = data;
    this.filename = filename;
  }
  import() {}
  async export() {
    const workSheet = this.workbook.addWorksheet('Sheet 1', {
      headerFooter: {
        firstHeader: this.title,
        firstFooter: this.title,
      },
      pageSetup: { paperSize: 9, orientation: 'landscape' },
    });
    workSheet.columns = [
      {
        header: 'serial',
        key: 'id',
        width: 10,
      },
      {
        header: 'title',
        key: 'title',
        width: 50,
      },
      {
        header: 'status',
        key: 'status',
        width: 30,
      },
    ];
    const rows = workSheet.getRows(2, this.data.length);
    _.forEach(this.data, (record, index) => {
      rows[index].values = {
        id: ++index,
        title: record.book_title,
        status: BookStatus[record.status],
      };
    });
    await this.workbook.xlsx.writeFile(this.filename);
    return this.filename;
  }
}

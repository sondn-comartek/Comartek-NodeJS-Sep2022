import { Parser, AsyncParser, parseAsync } from 'json2csv';
import * as fs from 'fs'
import { join } from 'path';

export const json2csv = (data: any) => {
  const { exportFileName, exportData, exportFields } = data;
  const fields = exportFields;

  let counter = 1;
  const createCounter = (item) => ({ counter: counter++, ...item, createdAt: item.createdAt.toString(), updatedAt: item.updatedAt.toString() });
  const transforms = [createCounter];
  const opts = { fields: fields, transforms: transforms };

  parseAsync(exportData, opts)
    .then(async (csv) => {
      fs.writeFileSync(join(process.cwd(), `./public/csv_files/${exportFileName}.csv`), csv, 'utf8');
    })
    .catch(err => console.error(err));

  return join(process.cwd(), `./public/csv_files/${exportFileName}.csv`);
}
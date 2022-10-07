import * as Excel from 'exceljs';

export const exportBooksFile = async (
  items,
  nameSheet,
  columns,
  exportPath,
) => {
  const workbook = new Excel.Workbook();
  const worksheet = workbook.addWorksheet(nameSheet);

  worksheet.columns = columns;

  items.forEach((item) => {
    worksheet.addRow(item);
  });

  await workbook.xlsx.writeFile(exportPath);
};

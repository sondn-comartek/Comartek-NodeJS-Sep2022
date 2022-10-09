import * as Excel from 'exceljs'
import { Document } from 'mongoose'
import * as fse from 'fs-extra'

export const exportHelper = async (
   docs: Document[],
   id: string,
   columnTemplate: Record<string, unknown>[],
) => {
   const excelStoragePath = process.cwd() + '/src/storage/excels/'
   await fse.ensureDir(excelStoragePath)
   const workbook = new Excel.Workbook()
   const worksheet = workbook.addWorksheet(`${id} list`)
   worksheet.columns = columnTemplate
   docs.forEach((doc) => {
      worksheet.addRow(doc)
   })
   await workbook.xlsx.writeFile(excelStoragePath + id + '.xlsx')
   return id
}

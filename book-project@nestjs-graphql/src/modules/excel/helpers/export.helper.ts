import * as Excel from 'exceljs'
import { Document } from 'mongoose'
import * as fse from 'fs-extra'

export const exportHelper = async (
   docs: Document[],
   id: string,
   columnTemplate: Record<string, unknown>[],
) => {
   const excelOriginPath = process.cwd() + '/src/storage/excels/'
   await fse.ensureDir(excelOriginPath)
   const workbook = new Excel.Workbook()
   const worksheet = workbook.addWorksheet('book list')
   worksheet.columns = columnTemplate
   docs.forEach((doc) => {
      worksheet.addRow(doc)
   })
    await workbook.xlsx.writeFile(excelOriginPath + id + '.xlsx')
    return id
}

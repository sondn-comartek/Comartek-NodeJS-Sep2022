import {
   BadRequestException,
   Controller,
   Get,
   Header,
   Param,
   Res,
   UseGuards,
} from '@nestjs/common'
import { Response } from 'express'
import { JwtGuard } from '../auth/guards'
import { Mine } from '../user/decorators'
import { User } from '../user/models'
import { ExcelService } from './excel.service'

@Controller('excels')
export class ExcelController {
   constructor(private excelService: ExcelService) {}
   @Get(':excelId')
   @UseGuards(JwtGuard)
   @Header(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
   )
   downloadFile(
      @Param('excelId') excelId: string,
      @Res() res: Response,
      @Mine() mine: User,
   ) {
      return this.excelService.streamFile(excelId, res , mine.userid)
   }
}

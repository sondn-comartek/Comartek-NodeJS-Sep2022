import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { Body, Controller, Header, Post, UseGuards } from '@nestjs/common';
import { Roles } from '../auth/roles.decorator';
import { Role } from '../user/enums/roles.enum';
import { StatisticalService } from './statistical.service';

@Controller()
export class StatisticalController {
  constructor(private statisticalService: StatisticalService) {}
  @Header(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  )
  @Header('Content-Disposition', 'attachment')
  @UseGuards(JwtAuthGuard)
  @Post('/export/excel')
  export(@Body() body) {
    const { file } = body;
    const streamFile = this.statisticalService.streamRender(file);
    return streamFile;
  }
}

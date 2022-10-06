import { Module } from '@nestjs/common';
import { Excel } from './export.excel';

@Module({
  providers: [Excel],
  exports: [Excel],
})
export class HelperModule {}

import { Resolver , Query , Mutation } from '@nestjs/graphql';
import { ExcelService } from './excel.service';

@Resolver()
export class ExcelResolver {
  constructor(private readonly excelService: ExcelService) {}


  @Query( () => String )
  exportExcelBooks(){
    return this.excelService.exportListBook() ;
  }

}

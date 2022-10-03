import { forwardRef, Module } from '@nestjs/common'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { BookModule } from '../book/book.module'
import { BookService } from '../book/book.service'
import { CategoryModule } from '../category/category.module'
import { CategoryService } from '../category/category.service'
import { OrderModule } from '../order/order.module'
import { OrderService } from '../order/order.service'
import { UserModule } from '../user/user.module'
import { UserService } from '../user/user.service'
import { DataLoaderInterceptor} from 'nestjs-dataloader'
import { BookLoader } from './loaders'

@Module({
   imports: [
      forwardRef(() => UserModule),
      forwardRef(() => CategoryModule),
      forwardRef(() => BookModule),
      forwardRef(() => OrderModule),
   ],
   providers: [
      UserService,
      CategoryService,
      BookService,
      OrderService ,
      {
        provide: APP_INTERCEPTOR,
        useClass: DataLoaderInterceptor,
      },
      BookLoader
    ],
    exports : [ BookLoader ]
})
export class DataloaderModule {}

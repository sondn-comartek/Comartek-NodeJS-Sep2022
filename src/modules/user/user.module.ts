import { Module, forwardRef } from "@nestjs/common";
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from "src/modules/auth/auth.module";
import { OrderModule } from "src/modules/order/order.module";
import { UserSchema } from "./model/user.model";
import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";
@Module({
    imports: [
        MongooseModule.forFeature([{ name: "User", schema: UserSchema }]),
        AuthModule,
        forwardRef(() => OrderModule)
    ],
    providers: [UserService, UserResolver],
    exports: [UserService]
})
export class UserModule {

}
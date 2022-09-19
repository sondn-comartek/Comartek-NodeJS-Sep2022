import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { PasswordModule } from "../password/password.module";
import { UserModule } from "../user/user.module";
import { User, UserEntity } from "../common/entities/user.entity";
import { ConfigModule } from "@nestjs/config";
import { LocalStrategy } from "./strategies/local.strategy";
import { JWTStrategy } from "./strategies/jwt.strategy";

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: User.name, schema: UserEntity }]),
    PassportModule,
    JwtModule.register({
      secret: "jwt_secret_string",
      signOptions: {
        expiresIn: 3600,
      },
    }),
    PasswordModule,
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JWTStrategy],
})
export class AuthModule {}

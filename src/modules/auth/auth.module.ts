import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from "./constants";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { SubStrategy } from "./strategy/sub.strategy";
@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '60d' },
        })
    ],
    providers: [AuthService, JwtStrategy, SubStrategy],
    exports: [AuthService]
})
export class AuthModule {

}
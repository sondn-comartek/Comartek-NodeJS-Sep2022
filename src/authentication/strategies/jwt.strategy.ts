import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserService } from '../../user/user.service';
import { Environments } from '../../environments/index';
import { UnauthorizedException, Injectable } from '@nestjs/common';
import { JwtPayload } from "src/shared/interfaces";

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: Environments.JwtSecret,
        });
    }

    async validate(payload: JwtPayload) {
        console.log({ payload })
        const { id } = payload

        const user = await this.userService.getUserById(id);
        if (!user) {
            throw new UnauthorizedException();
        }

        return payload
    }
}
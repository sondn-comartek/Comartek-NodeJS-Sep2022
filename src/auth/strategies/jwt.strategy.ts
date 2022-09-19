import { Injectable } from "@nestjs/common/decorators";
import { Req } from "@nestjs/common/decorators/http/route-params.decorator";
import { UnauthorizedException } from "@nestjs/common/exceptions";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JWTPayload } from "../../common/interfaces";
import { UserService } from "../../user/user.service";

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "jwt_secret_string",
    });
  }

  async validate(payload: JWTPayload) {
    const { email } = payload;

    const user = await this.userService.findUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException();
    }

    return payload;
  }
}

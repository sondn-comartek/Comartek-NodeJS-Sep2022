import { UserService } from './../../user/user.service';
import { JwtPayloadInterface } from './../interfaces/jwt-payload.interface';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'Your secret string',
    });
  }

  async validate(
    jwtPayload: JwtPayloadInterface,
  ): Promise<JwtPayloadInterface> {
    const { _id } = jwtPayload;

    if (!(await this.userService.findById(_id))) {
      throw new UnauthorizedException('You are not authenticated');
    }

    return jwtPayload;
  }
}

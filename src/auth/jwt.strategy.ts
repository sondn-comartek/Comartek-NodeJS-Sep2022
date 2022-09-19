import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';
import { Request } from 'express';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('jwt'),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
      passReqToCallBack: true
    });
  }

  async validate(payload: any) {
    return {
      username: payload.username,
      role: payload.role
    };
  }
}
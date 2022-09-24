import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Environments } from '../../environments/index';
import { UnauthorizedException, Injectable } from '@nestjs/common';
import { JwtPayload } from '../../shared/interfaces';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../shared/schemas';
import { Model } from 'mongoose';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User.name) private readonly UserSchema: Model<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: Environments.JwtSecret,
    });
  }

  async validate(payload: JwtPayload) {
    const { _id } = payload;

    const user = await this.UserSchema.findById(_id);
    if (!user) {
      throw new UnauthorizedException('You are not authenticated');
    }

    return payload;
  }
}

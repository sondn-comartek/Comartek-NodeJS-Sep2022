import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { 
    PassportStrategy
} from '@nestjs/passport' 

import {
    Strategy ,
    ExtractJwt
} from 'passport-jwt'
import { TokenType } from '../constant'


@Injectable()
export class JwtStrategy extends PassportStrategy(
    Strategy ,
    'jwt'
){
    constructor(
        configService: ConfigService , 
        ){
        super({
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey : configService.get(`ACCESS_TOKEN_SECRET`)
        })
    }
    async validate(payload: any){
        return { email : payload.email , role : payload.role } ;
    }
    
}
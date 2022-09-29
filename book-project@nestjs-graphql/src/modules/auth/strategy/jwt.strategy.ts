import { Strategy , ExtractJwt} from 'passport-jwt' 
import { PassportStrategy } from '@nestjs/passport'
import { ConfigService } from '@nestjs/config' 
import { Injectable } from '@nestjs/common'

@Injectable()
export class JwtStrategy extends PassportStrategy(
    Strategy ,  
    'jwt'
){
    constructor(
        protected configService : ConfigService
    ){ 
        super({
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey : configService.get('ACCESS_TOKEN_SECRET')
        })
    }
    async validate(payload: any){
        return payload
    }
    
}
import { Injectable } from '@nestjs/common'
import { ConfigService} from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { JwtTokens } from '../models'
import { TokenType } from '../types'

@Injectable()
export class GenTokenTool {
    constructor(
        private readonly jwtService: JwtService ,
        private readonly configService: ConfigService
    ){}
    
    generateOne(payload: string | Buffer | Record<string,unknown> , type: keyof typeof TokenType ):string{
        return this.jwtService.sign(payload , {
            secret : this.configService.get(type + '_SECRET') ,
            expiresIn : this.configService.get(type + '_EXPIRE') 
        })
    }

    generateMany(payload: string | Buffer | Record<string,unknown> | any):JwtTokens{
        return {
            accessToken : this.jwtService.sign(payload , {
                secret : this.configService.get('ACCESS_TOKEN_SECRET') ,
                expiresIn : this.configService.get('ACCESS_TOKEN_EXPIRE')
            }),
            refreshToken : this.jwtService.sign(payload , {
                secret : this.configService.get('REFRESH_TOKEN_SECRET'),
                expiresIn : this.configService.get('REFRESH_TOKEN_EXPIRE')
            })
        }
    }
}
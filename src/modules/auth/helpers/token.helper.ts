import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {JwtService } from '@nestjs/jwt'
import { TokenType } from "../constant";

@Injectable()
export class TokenHelper {
    constructor(
        protected readonly JwtService: JwtService ,
        protected readonly ConfigService: ConfigService
    ){}
    generateOne(payload: string | Buffer | Record < string , unknown> , type: keyof typeof TokenType): string | any {
        return this.JwtService.sign(payload , {
            secret : this.ConfigService.get(`${type}_SECRET`) ,
            expiresIn : this.ConfigService.get(`EXPIRES_${type}`)
        })
    }
    generateAll(payload: string | Buffer | Record < string , unknown> ): Record< string , unknown> | any {
        return {
            accessToken : this.JwtService.sign(payload , {
                secret : this.ConfigService.get('ACCESS_TOKEN_SECRET') ,
                expiresIn : this.ConfigService.get('EXPIRE_ACCESS_TOKEN')
            }) ,
            refreshToken : this.JwtService.sign(payload , {
                secret : this.ConfigService.get('REFRESH_TOKEN_SECRET') ,
                expiresIn : this.ConfigService.get('EXPIRE_REFRESH_TOKEN')
            })
        }
    }
}
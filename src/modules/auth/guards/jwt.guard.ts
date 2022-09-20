import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport'

export class JwtGruad extends AuthGuard('jwt'){
    constructor(){
        super();
    }
}

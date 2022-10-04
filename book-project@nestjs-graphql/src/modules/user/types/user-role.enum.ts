import { registerEnumType } from '@nestjs/graphql'
export enum UserRole {
    MEMBER = "member" ,
    ADMIN = 'admin' ,
    SUBCRIBER = 'subscriber' ,
}

registerEnumType( UserRole , {
    name : 'UserRole'
})
import { registerEnumType } from '@nestjs/graphql'
export enum UserRole {
    MEMBER = "member" ,
    ADMIN = 'admin' ,
    SUBCRIBER = 'subscriber' ,
    SUPERADMIN = 'superadmin'
}

registerEnumType( UserRole , {
    name : 'UserRole'
})
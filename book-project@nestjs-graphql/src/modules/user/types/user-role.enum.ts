import { registerEnumType } from '@nestjs/graphql'
export enum UserRole {
    MEMBER = "member" ,
    ADMIN = 'admin'
}

registerEnumType(UserRole , {
    name : 'UserRole'
})
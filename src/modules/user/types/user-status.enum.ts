import { registerEnumType } from '@nestjs/graphql'
export enum UserStatus {
    ACTIVE = 'active' ,
    INACTIVE = 'inactive'
}
registerEnumType(UserStatus , {
    name : 'UserStatus'
})
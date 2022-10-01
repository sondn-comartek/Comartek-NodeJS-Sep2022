import { UserRoleEnum } from 'src/modules/user/enums/user-role.enum';

export interface JwtPayloadInterface {
  readonly _id: string;
  readonly role: UserRoleEnum;
}

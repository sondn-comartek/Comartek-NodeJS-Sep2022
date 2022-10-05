import { PasswordHelper } from 'src/modules/auth/helpers/password.helper';
import { UserRoleEnum } from 'src/modules/user/enums/user-role.enum';
import { MigrationCommand } from './../migration.command';

export const name = 'createAdmin';

export const up = async (migrationCommand: MigrationCommand) => {
  console.log('migrate createSuperAdmin: 1622773811519-createadmin');
  const passwordHelper = new PasswordHelper();

  await migrationCommand.userModel.create({
    userName: 'admin',
    fullName: 'AdminDepTrai',
    password: await passwordHelper.encryptPassword('123456789'),
    email: 'admin@gmail.com',
    role: UserRoleEnum.ADMIN,
  });
};

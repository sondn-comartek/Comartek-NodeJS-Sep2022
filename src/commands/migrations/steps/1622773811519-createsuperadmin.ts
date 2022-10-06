import { UserRoleEnum } from 'src/modules/user/enums/user-role.enum';
import { Migration } from '../migrations.command';

export const name = 'createSuperAdmin';
export const up = async (migration: Migration) => {
  console.log('migrate createSuperAdmin: 1622773811519-createsuperadmin');
  await migration.userModel.create({
    userName: 'superadmin',
    fullName: 'ADMIN',
    email: 'admin@comartek.com',
    password: '$2b$10$J6p/ynla2p2TeAopRMQbZOx7vVvO2nIiTKgY7nJyLgdsnJ.hPl75O',
    role: UserRoleEnum.ADMIN,
    phone: '+84 123456789',
  });
};

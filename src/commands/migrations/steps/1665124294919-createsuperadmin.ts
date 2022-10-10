import { Role } from 'src/modules/users/enums/role.enum';
import { UserStatus } from 'src/modules/users/enums/status.enum';
import { Migration } from '../migrations.command';

export const name = 'createSuperAdmin';
export const up = async (migration: Migration) => {
  console.log('migrate createSuperAdmin: 1665124294919-createsuperadmin');
  migration.userModel.create({
    username: 'superadmin',
    firstName: 'Super',
    lastName: 'Admin',
    email: 'admin@comartek.com',
    password: '$2b$10$J6p/ynla2p2TeAopRMQbZOx7vVvO2nIiTKgY7nJyLgdsnJ.hPl75O',
    phone: '+84 123456789',
    status: UserStatus.Active,
    role: Role.Admin,
    // createdAt: new Date(),
    // updatedAt: new Date(),
  });
};

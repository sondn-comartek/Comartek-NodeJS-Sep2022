import { Migration } from '../migrations.command';
import { faker } from '@faker-js/faker';
import { Role } from 'src/modules/user/enums/roles.enum';
export const name = 'create_super_admin';
export const up = async (migration: Migration) => {
  console.log('migrate create_super_admin: 1665028334207-create_super_admin');
  await migration.userModel.create({
    email: faker.internet.email(),
    password: faker.internet.password(),
    role: Role.admin,
  });
};

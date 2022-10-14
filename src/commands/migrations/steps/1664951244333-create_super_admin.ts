import { Migration } from "../migrations.command";
import { hashPassword } from "src/utils/hash-password";
import { Role } from "src/module/auth/enums/role.enum";
import * as dayjs from 'dayjs';

export const name = 'create_super_admin';
export const up = async (migration: Migration) => {
  console.log('migrate create_super_admin: 1664951244333-create_super_admin');
  await migration.userModel.create({
    username: 'admin',
    firstName: 'Super',
    lastName: 'Admin',
    userRole: Role.ADMIN,
    phone: '0000-000-000',
    email: 'admin@comartek.com',
    password: await hashPassword('admin123'),
    city: 'Ha Noi',
    createdAt: dayjs().unix(),
    updatedAt: dayjs().unix()
  });
};

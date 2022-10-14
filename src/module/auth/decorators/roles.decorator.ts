import { SetMetadata } from '@nestjs/common';
import { Role } from '../enums/role.enum';

export const ROLES_KEY = 'userRole';
export const Roles = (...userRole: Role[]) => SetMetadata(ROLES_KEY, userRole);
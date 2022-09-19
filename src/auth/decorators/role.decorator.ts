import { SetMetadata } from '@nestjs/common';
import { Role } from '../../common/enums';

export const Roles = (...roles: Role[]) => SetMetadata("roles", roles);
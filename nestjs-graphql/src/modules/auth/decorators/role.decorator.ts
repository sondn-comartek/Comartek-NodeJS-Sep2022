import { SetMetadata } from "@nestjs/common";
import { UserRole } from "src/modules/user/types";

export const Role = (...roles: UserRole[] ) => SetMetadata('roles' , roles)
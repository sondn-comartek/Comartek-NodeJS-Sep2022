import { SetMetadata } from "@nestjs/common";
import { UserStatus } from "src/modules/user/types";

export const Status = (...status: UserStatus[]) => SetMetadata('status' , status)
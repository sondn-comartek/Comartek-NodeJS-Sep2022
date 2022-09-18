import { AuthGuard } from "@nestjs/passport";
import { AuthGuardTypes } from "../constants";

export class LocalAuthGuard extends AuthGuard(AuthGuardTypes.Local) {}

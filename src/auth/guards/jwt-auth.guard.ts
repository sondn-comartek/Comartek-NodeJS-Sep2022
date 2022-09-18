import { AuthGuard } from "@nestjs/passport";
import { AuthGuardTypes } from "../constants";

export class JWTAuthGuard extends AuthGuard(AuthGuardTypes.JWT) {}

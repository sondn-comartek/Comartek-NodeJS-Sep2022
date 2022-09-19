import { Injectable } from "@nestjs/common/decorators";
import { AuthGuard } from "@nestjs/passport";
import { AuthGuardTypes } from "../constants";

@Injectable()
export class JWTAuthGuard extends AuthGuard(AuthGuardTypes.JWT) { }

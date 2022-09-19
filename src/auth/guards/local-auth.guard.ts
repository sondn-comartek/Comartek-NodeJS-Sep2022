import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthGuardTypes } from "../constants";

@Injectable()
export class LocalAuthGuard extends AuthGuard(AuthGuardTypes.Local) { }

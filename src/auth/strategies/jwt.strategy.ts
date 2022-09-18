import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";

export class JWTStrategy extends PassportStrategy(Strategy) {}

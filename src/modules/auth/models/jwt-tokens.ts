import { OmitType } from "@nestjs/graphql";
import { Token } from "./token.model";



export class JwtTokens extends OmitType(Token , ['userid']){}
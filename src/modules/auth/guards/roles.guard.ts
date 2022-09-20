import { Reflector } from "@nestjs/core";
import { RoleStrategy } from "../strategy/role.strategy";

export class RoleGuards extends RoleStrategy{
    constructor(Reflector: Reflector){
        super(Reflector)
    }
}
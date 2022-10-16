import { Reflector } from "@nestjs/core";
import { RoleStrategy } from "../strategy";

export class RoleGuard extends RoleStrategy{
    constructor(reflector: Reflector){
        super(reflector)
    }
}
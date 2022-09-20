import { Reflector } from "@nestjs/core";
import { RoleStrategy } from "../strategy";

export class RoleGuards extends RoleStrategy{
    constructor(Reflector: Reflector){
        super(Reflector)
    }
}
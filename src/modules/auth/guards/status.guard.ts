import { Reflector } from "@nestjs/core";
import { StatusStrategy } from "../strategy";

export class StatusGuard extends StatusStrategy {
    constructor(reflector: Reflector){
        super(reflector)
    }
}
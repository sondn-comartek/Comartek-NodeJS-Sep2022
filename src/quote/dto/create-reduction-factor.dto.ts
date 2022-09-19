import { IsNotEmpty, IsString, IsBoolean } from "class-validator";

export class CreateReductionFactorDto {
    @IsNotEmpty()
    @IsString()
    readonly reducion_factor_name: string;

    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @IsNotEmpty()
    @IsBoolean()
    readonly is_occur: boolean;
}
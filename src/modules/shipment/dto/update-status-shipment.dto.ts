import { IsIn, IsNotEmpty, IsString , Matches} from "class-validator";

export class UpdateShipmentStatusDto {
    @IsString()
    @IsNotEmpty()
    @IsIn(['pending', 'confimed' , 'delivery' , 'completed' , 'failed'])
    status : string
    @IsString()
    @IsNotEmpty()
    ref : string 
}
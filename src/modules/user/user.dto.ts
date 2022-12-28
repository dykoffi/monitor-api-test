import { IsNumber, IsString } from "class-validator";
import { Expose } from "class-transformer";

export class createUser {
    
    @Expose()
    @IsString()
    first_name: string;

    @Expose()
    @IsString()
    last_name: string;

    @Expose()
    @IsNumber()
    year_name: number;
}

export class updateUser {
    
}
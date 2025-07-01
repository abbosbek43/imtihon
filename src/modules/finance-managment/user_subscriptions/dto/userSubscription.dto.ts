import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsUUID } from "class-validator";

export class CreateUserSubscriptionDto{
    @ApiProperty({example:""})
    @IsUUID()
    planId:string

    @ApiProperty({example:""})
    @IsBoolean()
    autoRenew:boolean

}
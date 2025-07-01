import { SubscriptionType } from "@prisma/client";
import { Transform } from "class-transformer";
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateMovieDto {
    @Transform((e) => {
        console.log([e.value])
        if(e.value.includes(",")) return e.value.split(",")
        if(typeof e.value === 'string') return [e.value] 
        return [e.value]   
    })
    @IsArray()
    categoriy_ids : string[]

    @IsString()
    @IsNotEmpty()
    title:string

    @IsString()
    description:string

    @Transform(((e) => parseInt(e.value)))
    @IsNumber()
    releaseYear:number

    @Transform((e) => {
        return parseInt(e.value)
    })
    @IsNumber()
    durationMinutes:number

    @IsNotEmpty()
    rating:number

    @IsEnum(SubscriptionType)
    subscriptionType : SubscriptionType
}

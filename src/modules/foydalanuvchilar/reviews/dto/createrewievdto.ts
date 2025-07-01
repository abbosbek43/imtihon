import { IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

export class CreateRewievsDto{
    @IsUUID()
    userId:string
    @IsUUID()
    movieId:string
    @IsNotEmpty()
    @IsNumber()
    rating:number
    @IsString()
    comment:string
}
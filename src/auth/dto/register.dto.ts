import { IsEmail, IsNotEmpty, MaxLength, MinLength } from "class-validator"

export class RegisterDto{
    @IsNotEmpty()
    username:string
    @IsEmail() 
    email:string
    @IsNotEmpty()
    @MaxLength(16)
    @MinLength(4)
    passwordHash:string
}
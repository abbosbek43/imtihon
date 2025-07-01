import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class Userdto {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsString()
  @MinLength(4)
  @MaxLength(18)
  @IsNotEmpty()
  passwordHash: string;
}

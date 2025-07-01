import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({example  :"csacacacs"})
  @IsNotEmpty()
  username: string;

  @ApiProperty({example  :"fayzillofn30@gmail.com"})
  @IsEmail()
  email: string;

  @ApiProperty({example  :"12345678"})
  @IsNotEmpty()
  @MaxLength(16)
  @MinLength(4)
  passwordHash: string;
}


export class VerifyDto {
  @ApiProperty({example  :"fayzillofn30@gmail.com"})
  @IsEmail()
  email: string;

  @ApiProperty({example  : '123456'})
  @IsString()
  code: string
}

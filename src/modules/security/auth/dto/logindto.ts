import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'csacacacs' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: '12345678' })
  @IsNotEmpty()
  @MaxLength(16)
  @MinLength(4)
  passwordHash: string;
}

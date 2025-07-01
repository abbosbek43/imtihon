import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateProfileDTo {
  @ApiProperty({example:"abbosbek zokirov"})
  @IsNotEmpty()
  @IsString()
  fullName?: string;

  @ApiProperty({example:"+998886204401"})
  @IsNotEmpty()
  @IsString()
  phone?: string;
  @ApiProperty({example:"uzbekistan"})
  @IsString()
  country?: string;
}


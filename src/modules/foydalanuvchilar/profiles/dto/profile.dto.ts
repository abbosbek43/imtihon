import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ProfileDTo {
  @ApiProperty({example:"abbosbek zokirov"})

  @IsString()
  fullName: string;

  @ApiProperty({example:"+998886204401"})

  @IsString()
  phone: string;
  @ApiProperty({example:"uzbekiston"})

  @IsString()
  country: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreteSubscriptionPlan {
  @ApiProperty({ example: 'premium' })
  @IsString()
  name: string;
  @ApiProperty({
    description: 'Obuna rejasi narxi',
    example: 49.99,
  })
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  price: number;

  @ApiProperty({
    description: 'Obuna muddati (kunlarda)',
    example: 30,
  })
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  durationDays: number;

  @ApiProperty({
    description: 'Obuna rejasi xususiyatlari',
    example: [{'HD sifatli kinolar' : true}, {'Reklamasiz' : true}, {'Yangi kinolar' : true}],
  })
  @IsArray()
  features: {[key : string] : any}[];

  @ApiProperty({
    description: 'Obuna rejasi faol holati',
    example: true,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

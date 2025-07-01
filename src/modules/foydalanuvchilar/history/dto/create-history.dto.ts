import { Transform } from "class-transformer";
import { IsNumber, IsUUID } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateHistoryDto {
  @ApiProperty({
    example: 'd2e9a5c2-7a19-4d6e-b1b5-8d35b579f6b8',
    description: 'Tomosha qilingan kino IDsi (UUID formatda)',
  })
  @IsUUID()
  movieId: string;

  @ApiProperty({
    example: 120,
    description: 'Foydalanuvchi tomosha qilgan davomiylik (sekundlarda)',
  })
  @Transform((e) => parseInt(e.value))
  @IsNumber()
  watchedDuration: number;

  @ApiProperty({
    example: 7,
    description: 'Foydalanuvchi necha foizini tomosha qilgan (0-100 oraligʻida)',
  })
  @Transform(({value}) => parseInt(value))
  @IsNumber()
  watchedPercentage: number;
}

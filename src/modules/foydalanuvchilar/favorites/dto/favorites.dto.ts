import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class createFavoritesDto {
    @ApiProperty({example:"qw21-1234-iuyr-54er"})
    @IsUUID()
    userId:string
    @ApiProperty({example:"qw21-1234-iuyr-54et"})
    @IsUUID()
    movieId:string

}
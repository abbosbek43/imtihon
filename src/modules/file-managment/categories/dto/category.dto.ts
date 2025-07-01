import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CategoryDto {
    @ApiProperty({example:'3x A'})
    @IsString()
    @IsNotEmpty()
    name:string

    @ApiProperty({example:"zor mazza asablaringiz damoladi"})
    @IsString()
    description:string

}

export class UpdateCategoryDto {
    @ApiProperty({example:'3x A'})
    @IsOptional()
    @IsString()
    name?:string

    @ApiProperty({example:"zor mazza asablaringiz damoladi"})
    @IsOptional()
    @IsString()
    description?:string

}
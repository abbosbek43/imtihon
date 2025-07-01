import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Request } from 'express';
import { ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { storagePoster, swaggerOptions } from './helpeer';
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('poster',{storage : storagePoster})) 
  @ApiConsumes('multipart/form-data') 
  @ApiBody(swaggerOptions)
  @ApiOperation({ summary: 'Create a new movie with poster' })
  create(
    @Body() createMovieDto: CreateMovieDto,
    @Req() req: Request,
    @UploadedFile() poster: Express.Multer.File,
  ) {
    // @ts-ignore
    const id = req['user'].id;
    return this.moviesService.create(createMovieDto, id, poster);
  }

  @Get()
  findAll() {
    return this.moviesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moviesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMovieDto: UpdateMovieDto) {
    return this.moviesService.update(+id, updateMovieDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moviesService.remove(id);
  }
}

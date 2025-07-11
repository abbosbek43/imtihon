import { BadRequestException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { v4 as uuidV4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class MoviesService {
  constructor(private readonly prisma: PrismaService) {}
  async create(data: CreateMovieDto, id: string,file : Express.Multer.File) {
    const resolArray = Promise.all(
      data.categoriy_ids.map((id) => {
        return new Promise(async (resolve, reject) => {
          const exists = await this.prisma.category.findFirst({
            where: { id: id },
          });
          if (exists) {
            resolve(exists.id);
          } else {
            reject(
              new BadRequestException(`Category not found : by [ ${id} ]`),
            );
          }
        });
      }),
    );

    return resolArray.then(async (ids) => {
      const slug = "#" + uuidV4() + data.title.toLocaleLowerCase().replaceAll(" ","-")
      const posterUrl = `http://${process.env.APP_HOST}:${process.env.APP_PORT}/api/uploads/posters/${file.filename}`

      const newMovie = await this.prisma.movie.create({
        data : {
          viewCount : 0,
          posterUrl,slug,title :data.title,createdById : id,
          subscriptionType : data.subscriptionType,
          durationMinutes : data.durationMinutes,
          description : data.description,
          releaseYear : data.releaseYear,
          rating : data.rating
        }
      })

      await this.createMct(data.categoriy_ids,newMovie.id)
      return newMovie
    }).catch(err => {
      throw new HttpException(err.message,400)
    });
  }

  async createMct(ids: string[], movieId: string) {
    return Promise.all(
      ids.map((id) => {
        return new Promise(async (resolve, reject) => {
          try {
            const mct = await this.prisma.movieCategory.create({
              data: {
                movieId,
                categoryId: id,
              },
            });
             resolve(mct)
          } catch (error) {
            reject(new HttpException(error.message,500))
          }finally{

          }
        });
      }),
    );
  }

  async findAll() {
    const movies = await this.prisma.movie.findMany({
      include : {categories : true,files : true,reviews : true}
    })
    return {
      message  :`This action returns all movies`,
      data : movies
    };
  }

  async findOne(id: string) {
    const existsMovie= await this.prisma.movie.findFirst({where:{id:id}})
    if(!existsMovie) throw new NotFoundException('movie not foud')

    return await this.prisma.movie.findFirst({where:{id:id}});
  }

  update(id: number, updateMovieDto: UpdateMovieDto) {
    return `This action updates a #${id} movie`;
  }

  async remove(id: string) {
    const movie = await this.prisma.movie.findUnique({
      where: { id },
      include: {
        categories: true,
      },
    });

    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    
    if (movie.posterUrl) {
      const posterFileName = path.basename(movie.posterUrl); 
      const posterFilePath = path.join(process.cwd(), 'src', 'uploads', 'posters', posterFileName);

      if (fs.existsSync(posterFilePath)) {
        fs.unlinkSync(posterFilePath); 
      }
    }

 
    await this.prisma.movieCategory.deleteMany({
      where: { movieId: id },
    });

  
    await this.prisma.movie.delete({
      where: { id },
    });

    return {
      message: 'Movie and its poster file deleted successfully',
    };
  }
}

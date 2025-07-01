import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { CreateRewievsDto } from './dto/createrewievdto';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}
  async createRewiev(data: CreateRewievsDto) {
    const existMovie = await this.prisma.movie.findFirst({
      where: { id: data.movieId },
    });
    if (!existMovie) throw new NotFoundException('movie not found ');

    const result = await this.prisma.review.create({ data: { ...data } });
    return {
      succes: true,
      message: 'rewiev created succesfully',
      result,
    };
  }
  async getall(){
    return this.prisma.review.findMany()
  }
  async getOne(id:string){
    const existRewiev= await this.prisma.review.findFirst({where:{id:id}})
    if(!existRewiev) throw new NotFoundException('rewiev not found')

    return this.prisma.review.findFirst({where:{id:id}})
  }
  async deleteRewiev(id:string){
    const existRewiev= await this.prisma.review.findFirst({where:{id:id}})
    if(!existRewiev) throw new NotFoundException('rewiev not found')

    await this.prisma.review.delete({where:{id:id}})
    return {
        succes:true,
        messaage:"rewiev deleted sucesfully"
    }
  }
}

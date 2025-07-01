import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';

@Injectable()
export class HistoryService {
  constructor (private  prisma :PrismaService){}
  async create(createHistoryDto: CreateHistoryDto,userId:string ) {
    const existsMovie=await this.prisma.movie.findFirst({where:{id:createHistoryDto.movieId}})
    if(!existsMovie) throw new NotFoundException('the movie not found')

      const result= await this.prisma.watchHistory.create({data:{...createHistoryDto,userId}})

    return {
      succes:true,
      message:'This action adds a new history',
      result
    };
  }

  async findAll() {
    return this.prisma.watchHistory.findMany();
  }

  async findOne(id: string) {
    return this.prisma.watchHistory.findFirst({where:{id:id}});
  }

  async update(id: string, updateHistoryDto: UpdateHistoryDto) {
    const exists= await this.prisma.watchHistory.findFirst({where:{id:id}}) 
    if(!exists) throw new NotFoundException('not found')

    await this.prisma.watchHistory.update({
      where:{id:id},
      data:{...updateHistoryDto}
    })
    return {
      succes:true,
      message:"history updated succesfully"
    }
  }

  async remove(id: string ) {
    const exists= await this.prisma.watchHistory.findFirst({where:{id:id}}) 
    if(!exists) throw new NotFoundException('not found')

    await this.prisma.watchHistory.delete({where:{id:id}})
    return {
      succes:true,
      message:'history deleted succesfully'
    }
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { createFavoritesDto } from './dto/favorites.dto';
import { NotFoundError } from 'rxjs';


@Injectable()
export class FavoritesService {
    constructor (private prisma:PrismaService){}
    async createFavorite(data:createFavoritesDto){
        const existUser= await this.prisma.user.findFirst({where:{id:data.userId}})
        if(!existUser) throw  new NotFoundException('user not found')

        const existMovie= await this.prisma.movie.findFirst({where:{id:data.movieId}})
        if(!existMovie) throw new NotFoundException("movie not found")


        const result=await this.prisma.favorite.create({
            data:{...data}
        })
        return {
            succes:true,
            message:"this movie added your favorites",
            result
        }
    }
    async getall(){
        return this.prisma.favorite.findMany()
    }
    async getOne(id:string){
        return this.prisma.favorite.findFirst({where:{id:id}})
    }
    async deleteFavorites(favouriteId:string){
        await this.prisma.favorite.delete({
            where:{id:favouriteId}
        })
        return {
            succes:true,
            message:"favourite deleted"
        }
    }
}

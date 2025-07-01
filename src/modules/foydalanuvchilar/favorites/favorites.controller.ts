import { Body, Controller, Delete, Get, Param, Post, SetMetadata } from '@nestjs/common';
import { createFavoritesDto } from './dto/favorites.dto';
import { FavoritesService } from './favorites.service';

@Controller('favorites')
@SetMetadata("isPublic",true)
export class FavoritesController {
    constructor(private favoriteS:FavoritesService){}
    @Post('favorite')
    create(@Body() data:createFavoritesDto){
        return this.favoriteS.createFavorite(data)
    }
    @Get()
    getCallSites(){
        return this.favoriteS.getall()
    }
    @Get('/:id')
    getone(@Param('id') id : string ){
        return this.favoriteS.getOne(id)
    }
    @Delete("favorite/:id")
    Deletefrom(@Param('id') id:string){
        return this.favoriteS.deleteFavorites(id)
    }
}

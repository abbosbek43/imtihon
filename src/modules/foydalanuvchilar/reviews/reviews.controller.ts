import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateRewievsDto } from './dto/createrewievdto';

@Controller('reviews')
export class ReviewsController {
    constructor(private rewievSer:ReviewsService){}
    @Post("add")
    addrewiev(@Body() data:CreateRewievsDto){
        return this.rewievSer.createRewiev(data)
    }
    @Get()
    getCallSites(){
        return this.rewievSer.getall()
    }
    @Get('/:id')
    getOne(@Param('id') id :string){
        return this.rewievSer.getOne(id)
    }
    @Delete('delete/:id')
    Deleterew(@Param('id') id :  string){
        return this.rewievSer.deleteRewiev(id)
    }
}

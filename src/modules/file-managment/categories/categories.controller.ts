import { Body, Controller, Delete, Get, Param, Patch, Post, SetMetadata } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryDto, UpdateCategoryDto } from './dto/category.dto';
import { pmetadata } from 'src/common/types';

@Controller('categories')
@SetMetadata(pmetadata,true)
export class CategoriesController {
    constructor(private category:CategoriesService){}
    @Post('addcategory')
    create(@Body() data : CategoryDto){
        return this.category.createCategory(data)
    }
    @Get('category')
    getall(){
        return this.category.getall()
    }
    @Get("category/:id")
    getone(@Param('id') id : string){
        return this.category.getone(id)
    }
    @Patch('category/:id')
    update(@Param('id') id : string , @Body() data:UpdateCategoryDto){
        return this.category.updateCategory(id,data)
    }
    @Delete('category/:id')
    deletes(@Param('id') id : string){
        return this.category.deleteCategory(id)
    }

}

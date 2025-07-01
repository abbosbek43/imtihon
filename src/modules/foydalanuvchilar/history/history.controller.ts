import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { HistoryService } from './history.service';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { Request } from 'express';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Post('add')
  create(@Body() createHistoryDto: CreateHistoryDto,
  @Req() req:Request 
) {
  // @ts-ignore
    const id = req['user'].id;
    return this.historyService.create(createHistoryDto,id);
  }

  @Get()
  findAll() {
    return this.historyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.historyService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHistoryDto: UpdateHistoryDto) {
    return this.historyService.update(id, updateHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.historyService.remove(id);
  }
}

import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { Userdto } from './dto/user.dto';
import { UpdateUserdto } from './dto/update.dto';

@Controller('users')
export class UsersController {
  constructor(private userservice: UsersService) {}
  @Post('add')
  addUser(@Body() data: Userdto) {
    return this.userservice.createUser(data);
  }
  @Get()
  getuser() {
    return this.userservice.getall();
  }
  @Get('/:id')
  findone(@Param('id') id: string) {
    return this.userservice.getone(id);
  }
  @Patch('/:id')
  update(@Param('id') id: string, @Body() Data: UpdateUserdto) {}
}

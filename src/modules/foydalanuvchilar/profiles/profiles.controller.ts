import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  SetMetadata,
  UnsupportedMediaTypeException,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { ProfilesService } from './profiles.service';
import { ProfileDTo } from './dto/profile.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { v4 as uuidV4 } from 'uuid';
import { GuardService } from 'src/common/guards/guards.service';
import { UpdateProfileDTo } from './dto/update.profile';
import { imageFileFilter, storage } from './helper';
import { Request, Response } from 'express';


@Controller('profiles')
@SetMetadata("isPublic",true)
export class ProfilesController {
  constructor(private profil: ProfilesService) {}
  @UseGuards(GuardService)
  @Post('profile')
  @UseInterceptors(
    FileInterceptor('avatar', { storage, fileFilter : imageFileFilter,}),
  )
  createProfile(
    @Body() data: ProfileDTo,
    @UploadedFile() file: Express.Multer.File,
    @Req() req,
  ) {
    const userId = req['user'].id;
    return this.profil.createProfile(data, file.filename, userId);
  }
  @Get('/:id')
  getUser(@Param('id') id: string) {
    return this.profil.getprofile(id);
  }
  @UseGuards(GuardService)
  @Post('profile')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage,
      fileFilter: imageFileFilter,
    }),
  )
  async update(
    @Body() data: UpdateProfileDTo,
    @UploadedFile() file: Express.Multer.File,
    @Req() req,
  ) {
    const userId = req['user'].id;
    return await this.profil.updateProfile(data, file.filename, userId);
  }
}

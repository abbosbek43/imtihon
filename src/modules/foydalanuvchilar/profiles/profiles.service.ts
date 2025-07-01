import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { ProfileDTo } from './dto/profile.dto';
import { UpdateProfileDTo } from './dto/update.profile';

@Injectable()
export class ProfilesService {
  constructor(private prisma: PrismaService) {}
  async createProfile(data: ProfileDTo, file: string, userId: string) {
    console.log(userId);
    const exists = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!exists) throw new NotFoundException('user not found');
    const findUsername = await this.prisma.profile.findFirst({
      where: { fullName: data.fullName },
    });

    const result = await this.prisma.profile.create({
      data: {
        country: data.country,
        fullName: data.fullName,
        phone: data.phone,
        avatarUrl: file,
        userId,
      },
    });
    return {
      succes: true,
      message: 'user create profile succesfully',
      data,
    };
  }
  async getprofile(id: string) {
    const result = await this.prisma.profile.findUnique({
      where: { id },
    });
    return {
      succes: true,
      message: 'the users profile',
      result,
    };
  }
  async updateProfile(data: UpdateProfileDTo, file: string, userId: string) {
    console.log(userId, 'salom');

    const exists = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!exists) throw new NotFoundException('user not found');

    const result = await this.prisma.profile.update({
      where: { id: userId },
      data: {
        country: data.country,
        fullName: data.fullName,
        phone: data.phone,
        avatarUrl: file,
        userId: userId,
      },
    });
    return {
      succes: true,
      message: 'user update profile succesfully',
      data,
    };
  }
}

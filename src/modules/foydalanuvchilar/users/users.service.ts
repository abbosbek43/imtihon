import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { Userdto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { UpdateUserdto } from './dto/update.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async createUser(data: Userdto) {
    const exist = await this.prisma.user.findUnique({
      where: { username: data.username },
    });

    if (exist) throw new ConflictException('user already exists');

    const hashed = await bcrypt.hash(data.passwordHash, 10);
    console.log(hashed);
    const result = await this.prisma.user.create({
      data: {
        ...data,
        passwordHash: hashed,
      },
    });
    return {
      succes: true,
      message: 'user created succesfully',
      result,
    };
  }
  async getall() {
    return this.prisma.user.findMany();
  }
  async getone(id: string) {
    const exists = await this.prisma.user.findFirst({ where: { id: id } });
    if (!exists) throw new NotFoundException('user not found');

    return this.prisma.user.findFirst({ where: { id: id } });
  }
  async uptadeUser(id: string, data: UpdateUserdto) {
    const existUser = await this.prisma.user.findFirst({ where: { id: id } });
    if (!existUser) throw new NotFoundException('user not found');
    if (data.passwordHash) {
      const hashed = await bcrypt.hash(data.passwordHash, 10);
    }
    await this.prisma.user.update({
      where: { id: id },
      data: {
        ...data,
      },
    });
    return {
      succes: true,
      message: 'user updated succesfully',
    };
  }
  async deleteUser(id: string) {
    const existUser = await this.prisma.user.findFirst({ where: { id: id } });
    if (!existUser) throw new NotFoundException('user not found');

    await this.prisma.user.delete({ where: { id: id } });
    return {
      succes: true,
      message: 'user deleted succesfully',
    };
  }
}

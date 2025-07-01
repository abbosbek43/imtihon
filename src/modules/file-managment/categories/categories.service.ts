import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CategoryDto, UpdateCategoryDto } from './dto/category.dto';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { v4 as uuidV4 } from 'uuid';
import { isUUID } from 'class-validator';
@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}
  async createCategory(data: CategoryDto) {
    const existMovie = await this.prisma.category.findFirst({
      where: { name: data.name },
    });
    if (existMovie) throw new ConflictException('category already exists');
    const slug =
      '#' + data.name.toLocaleLowerCase().replaceAll(' ', '_') + uuidV4();

    const result = await this.prisma.category.create({
      data: { ...data, slug },
    });
    return {
      succes: true,
      message: 'category created succesfully',
      result,
    };
  }
  async getall() {
    return this.prisma.category.findMany();
  }
  async getone(id: string) {
    const existcategory = await this.prisma.category.findFirst({
      where: { id: id },
    });
    if (!existcategory) throw new NotFoundException('user not found');

    return this.prisma.category.findFirst({ where: { id: id } });
  }
  async updateCategory(id: string, data: UpdateCategoryDto, slug?: string) {
    if (!isUUID(id)) throw new BadRequestException('invalid id not uuid !');

    if (Object.values(data).length === 0)
      throw new BadRequestException('Invalid data empity values !');
    const exists = await this.prisma.category.findFirst({ where: { id: id } });

    if (!exists) throw new NotFoundException('user not found');

    await this.prisma.category.update({
      where: { id: id },
      data: { ...data, slug },
    });
    return {
      succes: true,
      message: 'category updated succesfuly',
    };
  }
  async deleteCategory(id: string) {
    const exists = await this.prisma.category.findFirst({ where: { id: id } });

    if (!exists) throw new NotFoundException('user not found');

    await this.prisma.category.delete({ where: { id: id } });
    return {
      succes: true,
      message: 'category deleted',
    };
  }
}

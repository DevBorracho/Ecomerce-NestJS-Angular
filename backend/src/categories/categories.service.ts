import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createCategoryDto: CreateCategoryDto) {
    return await this.prisma.category.create({
      data: createCategoryDto,
    });
  }

  async findAll() {
    return await this.prisma.category.findMany();
  }

  async findOne(id: string) {
    const categorie = await this.prisma.category.findUnique({
      where: {
        id,
      },
    });
    if (!categorie) throw new NotFoundException('categoria no encontrada');
    return categorie;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.prisma.product.update({
      where: { id },
      data: updateCategoryDto,
    });
    if (!category) throw new NotFoundException('categoria no encontrada');
    return category;
  }

  async remove(id: string) {
    const category = await this.prisma.product.delete({
      where: { id },
    });
    if (!category) throw new NotFoundException('categoria no encontrada');
    return category;
  }
}

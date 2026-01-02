import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from '../../generated/prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = await this.prisma.product.create({
      data: {
        name: createProductDto.name,
        description: createProductDto.description,
        price: createProductDto.price,
        stock: createProductDto.stock,
        imageURL: createProductDto.imageURL,
        categories: {
          connect: createProductDto.categories.map((categoryID) => ({
            id: categoryID,
          })),
        },
      },
      include: { categories: true },
    });
    return product;
  }

  async findAll(categoryName?: string, name?: string) {
    if (typeof categoryName === 'string' && categoryName.trim().length > 0) {
      return this.prisma.product.findMany({
        where: {
          categories: {
            some: {
              name: {
                equals: categoryName.trim(),
                mode: 'insensitive',
              },
            },
          },
        },
        include: { categories: true },
      });
    }

    if (typeof name === 'string' && name.trim().length > 0) {
      return this.prisma.product.findMany({
        where: {
          name: {
            contains: name.trim(),
            mode: 'insensitive',
          },
        },
        include: { categories: true },
      });
    }

    return this.prisma.product.findMany({
      include: { categories: true },
    });
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        categories: true,
      },
    });
    if (!product) throw new NotFoundException();
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const product = await this.prisma.product.update({
      where: { id },
      data: {
        name: updateProductDto.name,
        description: updateProductDto.description,
        price: updateProductDto.price,
        stock: updateProductDto.stock,
        imageURL: updateProductDto.imageURL,
        categories: {
          connect: updateProductDto.categories?.map((categoryID) => ({
            id: categoryID,
          })),
        },
      },
      include: {
        categories: true,
      },
    });
    if (!product) throw new NotFoundException();
    return product;
  }

  async remove(id: string) {
    const product = await this.prisma.product.delete({
      where: { id },
      include: { categories: true },
    });
    if (!product) throw new NotFoundException();
    return product;
  }
}

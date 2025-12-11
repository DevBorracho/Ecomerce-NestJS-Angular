import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaClient, Product } from '../../generated/prisma/client';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaClient) {}
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
    });
    return product;
  }

  async findAll() {
    const products = await this.prisma.product.findMany();
    if (!products) throw new NotFoundException();
    return products;
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({ where: { id } });
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
    });
    if (!product) throw new NotFoundException();
    return product;
  }

  async remove(id: string) {
    const product = await this.prisma.product.delete({ where: { id } });
    if (!product) throw new NotFoundException();
    return product;
  }
}

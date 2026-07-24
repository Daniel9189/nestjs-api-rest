import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { NotFoundError } from './errors';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {}

  create(createProductDto: CreateProductDto) {
    return this.prismaService.product.create({
      data: {
        ...createProductDto,
        quantity: 0,
      },
    });
  }

  findAll() {
    return this.prismaService.product.findMany();
  }

  async findOne(id: number) {
    try {
      return await this.prismaService.product.findUniqueOrThrow({
        where: {
          id,
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundError(`Product with ID ${id} not found`);
      }
      throw error;
    }
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.prismaService.product.update({
      where: {
        id,
      },
      data: updateProductDto,
    });
  }

  remove(id: number) {
    return this.prismaService.product.delete({
      where: {
        id,
      },
    });
  }
}

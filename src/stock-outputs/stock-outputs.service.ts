import { Injectable } from '@nestjs/common';
import { CreateStockOutputDto } from './dto/create-stock-output.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StockOutputsService {
constructor(private prismaService: PrismaService) {}

  async create(createStockOutputDto: CreateStockOutputDto) {
    const product = await this.prismaService.product.findUnique({
      where: {
        id: createStockOutputDto.product_id,
      },
    });

    if (!product) {
      throw new NotFoundError('Product not found');
    }

    const result = await this.prismaService.$transaction([
      this.prismaService.stockOutput.create({
        data: {
          productId: createStockOutputDto.product_id,
          quantity: createStockOutputDto.quantity,
          date: createStockOutputDto.date,
        },
      }),
      this.prismaService.product.update({
        where: {
          id: createStockOutputDto.product_id,
        },
        data: {
          quantity: {
            increment: createStockOutputDto.quantity,
          },
        },
      }),
    ]);

    return result[0];
  }

  findAll() {
    return this.prismaService.stockOutput.findMany();
  }

  async findOne(id: number) {
    try {
      return await this.prismaService.stockOutput.findUniqueOrThrow({
        where: {
          id,
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundError(`Stock Output with ID ${id} not found`);
      }
      throw error;
    }
  }
}

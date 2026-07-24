import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStockInputDto } from './dto/create-stock-input.dto';

@Injectable()
export class StockInputsService {
  constructor(private prismaService: PrismaService) {}
  
  create(createStockInputDto: CreateStockInputDto) {
    return 'This action adds a new stockInput';
  }

  findAll() {
    return `This action returns all stockInputs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stockInput`;
  }
}

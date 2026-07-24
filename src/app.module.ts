import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { PrismaModule } from './prisma/prisma.module';
import { StockInputsModule } from './stock-inputs/stock-inputs.module';

@Module({
  imports: [ProductsModule, PrismaModule, StockInputsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { UploaderService } from 'src/services/uploader/s3.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService,UploaderService],
})
export class ProductModule {}

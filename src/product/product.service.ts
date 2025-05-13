import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaClient } from 'generated/prisma';
import { UploaderService } from '../services/uploader/s3.service';
import { v4 } from 'uuid';


@Injectable()
export class ProductService extends PrismaClient implements OnModuleInit{
  constructor (private readonly uploaderService : UploaderService){
    super ();
  }
  async onModuleInit() {
    await this.$connect;
  }
  async create(createProductDto: CreateProductDto, image: Express.Multer.File) {
    const product = await this.product.create({
      data: {
        ...createProductDto,
        image: v4(),
      },
    });
    await this.uploaderService.upload(image, product.image);
  }

  async findAll() {
    const products = await this.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return await Promise.all(
      products.map(async (Product) => {
        const url = await this.uploaderService.getSignedUrl(Product.image);
        return { ...Product, image: url };
      }),
    );
  }


  findOne(id) {
    return this.product.findFirst({where: {id}});
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return this.product.update({
    where: {id},
    data: updateProductDto
  });
  }

  async remove(id: string) {
    const products= await this.product.delete({
      where: { id },
    });

    await this.uploaderService.delete(products.image);
  }
}

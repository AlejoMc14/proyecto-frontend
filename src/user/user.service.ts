import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaClient } from 'generated/prisma';
import { v4 } from 'uuid';
import { UploaderService } from 'src/services/uploader/s3.service';


@Injectable()
export class UserService extends PrismaClient implements OnModuleInit {
  constructor(private readonly uploaderService: UploaderService) {
    super();
}

  async onModuleInit() {
    await this.$connect(); 
  }
  async create(createBlogDto: CreateUserDto, image: Express.Multer.File) {
    const user = await this.user.create({
      data: {
        ...createBlogDto,
        image: v4(),
      },
    });
    await this.uploaderService.upload(image, user.image);
  }

  findOne() {
    return this.user.findFirst();
  }
 
  async remove(id: string) {
    const user = await this.user.delete({
      where: { id },
    });

    await this.uploaderService.delete(user.image);
  }
}


import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UploaderService } from 'src/services/uploader/s3.service';

@Module({
  controllers: [UserController],
  providers: [UserService, UploaderService],
})
export class UserModule {}

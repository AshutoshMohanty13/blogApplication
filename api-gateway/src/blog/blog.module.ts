import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { ResponseHandlerService } from 'src/helper/response-handler.service';

@Module({
  providers: [BlogService, ResponseHandlerService],
  controllers: [BlogController],
})
export class BlogModule {}

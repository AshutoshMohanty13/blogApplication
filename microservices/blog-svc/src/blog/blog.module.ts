import { Module } from '@nestjs/common';
import { BlogController } from './blog.controller';
import { BlogSchema } from './schema/blog.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogService } from './blog.service';
import { HelperModule } from 'src/helper/helper.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Blog', schema: BlogSchema }]),
    HelperModule,
  ],
  controllers: [BlogController],
  providers: [BlogService],
  exports: [BlogService],
})
export class BlogModule {}

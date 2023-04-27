import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { BlogModule } from './blog/blog.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { HelperModule } from './helper/helper.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../.env',
    }),
    MongooseModule.forRoot(process.env.DB_URL),
    BlogModule,
    HelperModule,
  ],
})
export class AppModule {}

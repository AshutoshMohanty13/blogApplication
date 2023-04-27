import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { TerminusModule } from '@nestjs/terminus';
import { BlogModule } from './blog/blog.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '../.env',
    }),
    TerminusModule,
    BlogModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}

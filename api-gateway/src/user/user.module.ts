import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { HelperModule } from '../helper/helper.module';
import { User2Service } from './userHelper.service';
@Module({
  imports: [HelperModule],
  controllers: [UserController],
  providers: [User2Service],
  exports: [User2Service],
})
export class UserModule {}

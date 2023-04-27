import { Injectable, HttpException } from '@nestjs/common';

@Injectable()
export class HelperService {
  async serializeUser(user) {
    try {
      user = JSON.parse(JSON.stringify(user));
      if (user.password || user.password !== null) {
        delete user.password;
      }
      if (user.otp || user.otp !== null) {
        delete user.otp;
      }

      if (user.balance || user.balance !== null) {
        delete user.balance;
      }

      if (user.galleryCollections || user.galleryCollections !== null) {
        delete user.galleryCollections;
      }
      return user;
    } catch (e) {
      throw new HttpException('internal server error', 500);
    }
  }
}

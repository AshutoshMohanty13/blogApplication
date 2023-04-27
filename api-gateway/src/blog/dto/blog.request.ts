import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateBlogRequest {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly body: string;

  userId: string;
  userName: string;
}

export class GetBlogByIdRequest {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly id: string;
}

export class GetBlogByUserRequest {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly userId: string;
}

export class UpdateBlogRequest {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly _id: string;

  @ApiProperty()
  @IsString()
  readonly title?: string;

  @ApiProperty()
  @IsString()
  readonly body?: string;
  userId: string;
}

export class DeleteBlogRequest {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly _id: string;

  readonly userId: string;
}

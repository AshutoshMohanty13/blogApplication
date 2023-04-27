import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBlogDto {
  @IsString()
  title: string;
  @IsString()
  body: string;
  @IsString()
  userId: string;
  @IsString()
  userName: string;
}

export class MessageResponse {
  @IsString()
  message: string;

  @IsNumber()
  statusCode: number;
}

export class GetAllBlogsResponse {
  @IsString()
  title: string;
  @IsString()
  body: string;
  @IsString()
  userId: string;
  @IsString()
  userName: string;
}

export class GetAllBlogsResponseArray {
  @IsArray()
  getAllBlogsResponse: GetAllBlogsResponse[];
}

export class GetBlogByIdDto {
  @IsString()
  id: string;
}
export class GetBlogByUserDto {
  @IsString()
  userId: string;
}

export class UpdateBlogDto {
  @IsString()
  _id: string;
  @IsString()
  userId: string;
  @IsString()
  title?: string;
  @IsString()
  body?: string;
}

export class DeleteBlogDto {
  @IsString()
  _id: string;
  @IsString()
  userId: string;
}

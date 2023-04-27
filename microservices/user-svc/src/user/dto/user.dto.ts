export class CreateUserDto {
  email: string;
  first_name: string;
  last_name: string;
  profileImageUrl: string;
}

export class UserCreatedResponse extends CreateUserDto {
  _id: string;
  message?: string;
  statusCode?: number;
}

export class GetUserByEmailDto {
  email: string;
}

export class UserResponse {
  _id: string;
}

import { PartialType } from '@nestjs/mapped-types';
import { UserRegisterDto } from './user-register.dto';
import { IsEmail, IsNotEmpty } from 'class-validator';

// export class UserLoginDto extends PartialType(UserRegisterDto) {}
export class UserLoginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}

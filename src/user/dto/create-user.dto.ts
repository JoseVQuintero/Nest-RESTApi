import {
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { IsJSON } from 'class-validator';
import { IContent } from '../interface/user';


// create-user-dto
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  userName?: string;

  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

}

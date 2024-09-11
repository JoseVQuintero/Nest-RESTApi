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
  fullName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsJSON()
  content: IContent;
}

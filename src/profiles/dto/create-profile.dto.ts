import {
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { IsJSON } from 'class-validator';
import { IContent } from '../interface/profile';

// create-user-dto
export class CreateProfileDto {
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsJSON()
  content: IContent;
  
}

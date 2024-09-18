import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService as UsersService } from '../../src/user/user.service';
import { RegisterDto } from './dto/register.dto';

import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {

  constructor( private readonly usersService: UsersService, private readonly jwtService: JwtService ) {}

  async register({ name, email, password }: RegisterDto) {

    const user = await this.usersService.findOneByEmail(email);
    const fullName = name;
    if (user) {
      throw new BadRequestException('User already exists');
    }

    await this.usersService.create( { name:fullName, email, password: await bcryptjs.hash(password, 10)} );

    return { name, email };
    
  }

  async login({ email, password }: LoginDto) {
    
    const user = await this.usersService.findByEmailWithPassword(email);
    if (!user) {
      throw new UnauthorizedException('email is wrong');
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('password is wrong');
    }  

    const payload = { email: user.email, role: user.profile.role };
    const token = await this.jwtService.signAsync( payload );

    return { token, email, role: user.profile.role };
  }

  async profile({ email, role }: { email: string; role: string }) {
    return await this.usersService.findOneByEmail(email);
  }

}

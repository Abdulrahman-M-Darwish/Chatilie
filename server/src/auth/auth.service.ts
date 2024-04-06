import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { SignupInput } from './dto/signup.input';
import { LoginInput } from './dto/login.input';
import * as argon from 'argon2';
import { UsersService } from 'src/users/users.service';
import { randomBytes } from 'crypto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  async signup(signupInput: SignupInput) {
    const { password, ...theRest } = signupInput;
    try {
      const hash = await argon.hash(password, {
        salt: randomBytes(16),
      });
      return await this.usersService.create({
        ...theRest,
        password: hash,
      });
    } catch (error) {
      if (error.detail.includes('email'))
        throw new ForbiddenException('Email already exists.');
      throw new ForbiddenException('Name already exists.');
    }
  }
  async login({ email, password }: LoginInput) {
    const user = await this.usersService.findOne(email);
    if (!user) throw new BadRequestException('Invalid Email/Password');
    const isMatch = await argon.verify(user.password, password);
    if (!isMatch) throw new BadRequestException('Invalid Email/Password');
    return user;
  }
}

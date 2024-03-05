import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entities/users.entity';
import { AccessToken } from './types/AccessToken';
import { UsersService } from 'src/users/users.service';
import { RegisterRequestDto } from './dtos/register-request.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user: User = await this.usersService.findOneByEmail(email);
    if (!user) throw new NotFoundException('User not found');

    const isMatch: boolean = bcrypt.compareSync(password, user.password);
    if (!isMatch) throw new BadRequestException('Password does not match');

    return user;
  }

  async login(user: User): Promise<AccessToken> {
    const payload = { email: user.email, id: user.id, roles: user.roles };
    return { access_token: this.jwtService.sign(payload) };
  }

  async register(user: RegisterRequestDto): Promise<AccessToken> {
    const existingUser = await this.usersService.findOneByEmail(user.email);
    if (existingUser) throw new BadRequestException('Email already exists');

    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser: User = {
      ...user,
      created_at: new Date(),
      updated_at: new Date(),
      password: hashedPassword,
    };

    await this.usersService.create(newUser);
    return this.login(newUser);
  }
}

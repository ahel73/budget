import { UserService } from './../user/user.service';
import { UnauthorizedException, Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import * as argon2 from "argon2";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(email) as User | undefined;
    const passwordIsMath = await argon2.verify(user.password, password);

    if (user && passwordIsMath) {
      return user;
    }
    throw new UnauthorizedException("Некорректный пароль");
  }

  async login(user: User) {
    const { id, email } = user;
    return {
      id,
      email,
      token: this.jwtService.sign({ id, email }),
    };
  }
}

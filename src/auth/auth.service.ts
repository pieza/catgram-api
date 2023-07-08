import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) { }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (!user) {
      throw new UnauthorizedException('invalid username or password');
    }
    const passwordValid = await bcrypt.compare(password, user.password)
    if (!passwordValid) {
      throw new UnauthorizedException('invalid username or password');
    }
    return {
      id: user._id,
      username: user.username,
      name: user.name
    };
  }
}

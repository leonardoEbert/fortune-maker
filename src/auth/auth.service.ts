import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '@/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '@/user/user.entity';
import { AuthPermission } from '@/auth/casl/entities/auth-permission.entity';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.userService.findOne(email);

    if (!(await this.checkPassword(password, user.password))) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, email: user.email };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }

  async checkPassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  async findAllPermissionsOfUser(user: User): Promise<AuthPermission[]> {
    return await this.userService.findAllPermissions(user);
  }

  checkToken(request: Request): boolean {
    const token = request.body.token;
    const validToken = this.jwtService.verify(token, {
      secret: this.configService.getOrThrow('JWT_SECRET_KEY'),
    });

    if (!!validToken) {
      return true;
    } else {
      throw new UnauthorizedException();
    }
  }
}

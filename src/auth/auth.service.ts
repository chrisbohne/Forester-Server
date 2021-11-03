import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { Auth } from './entity/auth.entity';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { username: username },
    });
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  async login(username: string, password: string): Promise<Auth> {
    const user = await this.prisma.user.findUnique({
      where: { username: username },
    });
    console.log('in login', user);

    if (!user) {
      throw new NotFoundException();
    }

    const passwordValid = user.password === password;

    if (!passwordValid) {
      throw new UnauthorizedException('Invalid Password');
    }

    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
    };
  }
}

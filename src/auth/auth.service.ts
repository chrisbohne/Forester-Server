import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Auth } from './entity/auth.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async register(registerDto: RegisterDto): Promise<Auth> {
    const saltOrRounds = 10;
    const password = registerDto.password;
    const hash = await bcrypt.hash(password, saltOrRounds);
    const data = { ...registerDto, password: hash };
    const user = await this.prisma.user.create({ data });

    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
      userName: data.username,
      email: data.email,
      experience: data.experience,
    };
  }

  async login(username: string, password: string): Promise<Auth> {
    const user = await this.prisma.user.findUnique({
      where: { username: username },
    });

    if (!user) {
      throw new NotFoundException('Password or Username does not exist');
    }

    // const passwordValid = user.password === password;
    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      throw new UnauthorizedException('Password or Username does not exist');
    }

    return {
      accessToken: this.jwtService.sign({ userId: user.id }),
      userName: user.username,
      email: user.email,
      experience: user.experience,
    };
  }

  // async logout(id: number) {

  // }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({ where: { id: id }, data: updateUserDto });
  }

  async removeUser(id: number) {
    return await this.prisma.user.delete({ where: { id: id } });
  }

  validateUser(id: number) {
    return this.prisma.user.findUnique({ where: { id: id } });
  }
}

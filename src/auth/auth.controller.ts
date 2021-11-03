import { Body, Request, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('bla')
  async bla(@Request() req) {
    console.log('in auth');
    return req.user;
  }

  @Post('login')
  async login(@Body() { username, password }: LoginDto) {
    return this.authService.login(username, password);
  }
}

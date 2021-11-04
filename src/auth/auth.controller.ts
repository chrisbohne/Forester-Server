import {
  Body,
  Controller,
  Post,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Auth } from './entity/auth.entity';
import { UserEntity } from './entity/user.entity';
import { JwtAuthGuard } from './jwt-auth.guard';
import { User } from './user.decorator';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({ type: Auth })
  async login(@Body() { username, password }: LoginDto) {
    return this.authService.login(username, password);
  }

  @Post('register')
  @ApiOkResponse({ type: Auth })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Patch('update-current-user')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ type: UserEntity })
  async update(@User() user: any, @Body() updateUserDto: UpdateUserDto) {
    console.log(user);
    return new UserEntity(
      await this.authService.updateUser(user.id, updateUserDto),
    );
  }

  @Delete('delete-current-user')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'User deleted' })
  async remove(@User() user: any) {
    await this.authService.removeUser(user.id);
  }
}

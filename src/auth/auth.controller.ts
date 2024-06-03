import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '@/auth/auth.service';
import { SignInDto } from '@/auth/dto/sign-in.dto';
import { AuthGuard } from '@/auth/guard/auth.guard';
import { Public } from '@/auth/decorators/public.decorator';
import { SignUpDto } from '@/auth/dto/sign-up.dto';
import { UserService } from '@/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.userService.signUp(signUpDto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('/check-token')
  checkToken(@Request() req) {
    return this.authService.checkToken(req);
  }
}

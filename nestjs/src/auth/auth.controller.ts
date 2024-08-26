import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Res,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { AuthenticateDto } from './dto/authenticate.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  async signIn(@Body() signInDto: AuthenticateDto, @Res() response: Response) {
    const { token } = await this.authService.signIn(
      signInDto.email,
      signInDto.password,
    );

    return response
      .cookie('tokenJwt', token, {
        path: '/',
      })
      .status(200)
      .json({ token });
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    console.log({ user: req.user });
    return this.authService.getProfile(req.user.id);
  }
}

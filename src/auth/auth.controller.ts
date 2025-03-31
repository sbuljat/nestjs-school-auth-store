import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() dto: Record<string, any>, @Res({ passthrough: true}) res: Response) {
    const access_token = await this.authService.login(dto.username, dto.password);
    //console.log('AuthController.login() => access_token:', access_token);

      // Set the cookie with the token
    res.cookie('nestjs-auth', access_token, {
      httpOnly: true, // Prevents client-side scripts from accessing the cookie
      secure: process.env.ENV === 'prod', // Use secure cookies in production
      sameSite: 'strict', // Prevents CSRF attacks
      maxAge: 3600000, // Cookie expiration time in milliseconds (e.g., 1 hour)
    });

    return { message: 'Login successful' };
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}

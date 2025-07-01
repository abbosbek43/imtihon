import { Body, Controller, Post, Req, Res, SetMetadata } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, VerifyDto } from './dto/register.dto';
import { LoginDto } from './dto/logindto';
import { Request, Response } from 'express';

@Controller('auth')
@SetMetadata("isPublic",true)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('verify')
  async verifyCode(
    @Body() body: VerifyDto,
    @Res() res : Response
  ) {
    const data = await this.authService.verifyCode(body);
    const {accessToken,refreshToken } = data.data.token
    res.cookie("accessToken",accessToken)
    res.cookie("refreshToken",refreshToken)
    console.log(accessToken)
    return res.json(data.data.user)
  }
  @Post('login')
  async login(
    @Body() body: LoginDto,
    @Res() res : Response
  ) {
    const data = await this.authService.Login(body);
    const {accessToken,refreshToken } = data.token
    res.cookie("accessToken",accessToken)
    res.cookie("refreshToken",refreshToken)
    console.log(accessToken)
    return res.json(data)
  }
}

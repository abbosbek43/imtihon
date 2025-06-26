import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from "bcrypt"
import { MailerService } from 'src/mailer/mailer.service';
import { RedisService } from 'src/redis/redis.service';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from 'src/token/token.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private mailer: MailerService,
    private redis: RedisService,
    private jwt : TokenService
  ) {}

  async register(data: RegisterDto) {
    const userExists = await this.prisma.user.findFirst({
      where: {
        OR: [{ username: data.username }, { email: data.email }],
      },
    });
    if (userExists) {
      throw new ConflictException('Bu username yoki email allaqachon royxatdan otgan');
    }

    const hashedPassword = await bcrypt.hash(data.passwordHash, 10);

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    await this.redis.set(
      `verify:${data.email}`,
      JSON.stringify({
        username: data.username,
        email: data.email,
        passwordHash: hashedPassword,
        code:verificationCode
      }),
      300, 
    );
    console.log(verificationCode)

    await this.mailer.sendVerificationEmail(data.email, verificationCode);

    
    return {
      success: true,
      message: 'Tasdiqlash kodi emailingizga yuborildi. Iltimos, 5 daqiqa ichida tasdiqlang.',
    };
  }
   async verifyCode(email: string, code: string) {
    const redisData = await this.redis.get(`verify:${email}`);
    if (!redisData) throw new NotFoundException("Tasdiqlash kodi topilmadi yoki muddati o'tgan");
    console.log(redisData);
    const parsed = JSON.parse(redisData);
    console.log(parsed);
    

   
    if (parsed.code !== code) {
      throw new BadRequestException("Kod notogri");
    }

    const createdUser = await this.prisma.user.create({
      data: {
        username: parsed.username,
        email: parsed.email,
        passwordHash: parsed.passwordHash,
      },
    });

    await this.redis.del(`verify:${email}`);

    const payload = {
      sub: createdUser.id,
      username: createdUser.username,
      role: createdUser.role,
    };

    const token = await this.jwt.generateTokenPair(payload);

    return {
      success: true,
      message: 'Foydalanuvchi royxatdan otdi',
      data: {
        user: {
          id: createdUser.id,
          username: createdUser.username,
          email: createdUser.email,
        },
        token,
      },
    };
  }
}
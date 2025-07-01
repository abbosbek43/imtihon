import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class GuardService implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();

    // 1. Agar route "public" bo‘lsa, himoya qilinmasin
    if (this.isPublicRoute(context)) return true;

    // 2. Aks holda tokenni tekshir
    return await this.validateToken(req);
  }

  private isPublicRoute(context: ExecutionContext): boolean {
    return this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);
  }

  private async validateToken(req: Request): Promise<boolean> {
    const token = req.cookies?.accessToken;

    if (!token) {
      throw new NotFoundException('Token not found!');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token);

      req['user'] = {
        id: payload.sub,
        role: payload.role,
      };

      return true;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      console.log(error)
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}

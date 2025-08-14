  import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { Request } from 'express';

  @Injectable()
  export class TokenGuard implements CanActivate {
    constructor(private jwt: JwtService) {}
    canActivate(context: ExecutionContext): boolean {
      const req: Request = context.switchToHttp().getRequest();
      const token = req.headers['authorization']?.split(' ')[1];
      
      if (!token) {
        throw new UnauthorizedException('Token not found');
      }
      try {
        const data = this.jwt.verify(token);
      
      if (!data) {
        throw new UnauthorizedException('Invalid token');
      }
      req['user'] = data;
      return true;
      } catch (error) {
         if (error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token expired');
      }

      if (error.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('Invalid token');
      }

      throw new UnauthorizedException('Token tekshiruvida xatolik');
      }
    }
  }

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) return false;
    try {
      const payload = this.jwtService.verify<{
        sub: string;
        roles: string[];
      }>(token);

      request.user = {
        userId: payload.sub,
        roles: payload.roles,
      };
      return true;
    } catch {
      return false;
    }
  }
}

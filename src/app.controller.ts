import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { RolesGuard } from './auth/roles.guard';

@Controller('protected')
export class AppController {
  @UseGuards(JwtAuthGuard)
  @Get('data')
  getProtectedData() {
    return { message: 'This is protected data' };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('admin-data')
  getAdminData() {
    return { message: 'Only admins can access this' };
  }
}

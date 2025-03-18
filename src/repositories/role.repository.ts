import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RoleRepository {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.role.findMany({ include: { permissions: true } });
  }

  async create(name: string) {
    return this.prisma.role.create({ data: { name } });
  }
}

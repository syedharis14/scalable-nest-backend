import { Injectable } from '@nestjs/common';
import { Permission, Role } from '../../prisma/generated/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RoleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<(Role & { permissions: Permission[] })[]> {
    return await this.prisma.role.findMany({
      include: { permissions: true },
    });
  }

  async create(name: string): Promise<Role> {
    return await this.prisma.role.create({
      data: { name },
    });
  }
}

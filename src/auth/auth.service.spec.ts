import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcryptjs';
import { User } from '../../prisma/generated/client';
import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from './auth.service';

// Mock implementations with proper typing
const mockPrisma = {
  user: {
    deleteMany: jest.fn().mockResolvedValue({}),
    create: jest
      .fn()
      .mockImplementation(({ data }) =>
        Promise.resolve({ id: '1', createdAt: new Date(), ...data } as User),
      ),
    findUnique: jest.fn().mockResolvedValue(null),
  },
};

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: mockPrisma },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('mock-token'),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should register a user', async () => {
    const email = `test-${Date.now()}@example.com`;
    await expect(
      authService.register(email, 'password'),
    ).resolves.toMatchObject({
      email,
    });
    // Explicitly type the expected argument to avoid an unsafe assignment.
    const expectedCreateArg: { data: { email: string; password: unknown } } = {
      data: {
        email,
        password: expect.any(String),
      },
    };
    expect(mockPrisma.user.create).toHaveBeenCalledWith(expectedCreateArg);
  });

  it('should throw error for invalid credentials', async () => {
    // Mock hashed password
    const hashedPassword = await bcrypt.hash('correct-password', 10);

    mockPrisma.user.findUnique.mockResolvedValueOnce({
      id: '1',
      createdAt: new Date(),
      email: 'test@example.com',
      password: hashedPassword,
    } as User);

    await expect(
      authService.login('test@example.com', 'wrong-password'),
    ).rejects.toThrow('Invalid credentials');
  });
});

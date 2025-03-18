import { JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "../prisma/prisma.service";
import { AuthService } from "./auth.service";

describe("AuthService", () => {
    let authService: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AuthService, PrismaService, JwtService]
        }).compile();

        authService = module.get<AuthService>(AuthService);
    });

    it("should register a user", async () => {
        const user = await authService.register("test@example.com", "password");
        expect(user.email).toBe("test@example.com");
    });
});

import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "../prisma/prisma.service";
import { RoleRepository } from "./role.repository";

describe("RoleRepository", () => {
    let roleRepository: RoleRepository;
    let prisma: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [RoleRepository, PrismaService]
        }).compile();

        roleRepository = module.get<RoleRepository>(RoleRepository);
        prisma = module.get<PrismaService>(PrismaService);

        await prisma.role.deleteMany({});
    });

    it("should create a new role", async () => {
        const roleName = `admin-${Date.now()}`;
        const role = await roleRepository.create(roleName);
        expect(role.name).toBe(roleName);
    });
});

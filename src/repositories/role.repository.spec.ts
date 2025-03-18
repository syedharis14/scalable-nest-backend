import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "../prisma/prisma.service";
import { RoleRepository } from "./role.repository";

describe("RoleRepository", () => {
    let roleRepository: RoleRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [RoleRepository, PrismaService]
        }).compile();

        roleRepository = module.get<RoleRepository>(RoleRepository);
    });

    it("should create a new role", async () => {
        const role = await roleRepository.create("admin");
        expect(role.name).toBe("admin");
    });
});

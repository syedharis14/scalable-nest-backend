import { JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

describe("AppController", () => {
    let appController: AppController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AppController],
            providers: [
                AppService,
                {
                    provide: JwtService,
                    useValue: {
                        sign: jest.fn(),
                        verify: jest.fn()
                    }
                }
            ]
        }).compile();

        appController = module.get<AppController>(AppController);
    });

    it("should be defined", () => {
        expect(appController).toBeDefined();
    });
});

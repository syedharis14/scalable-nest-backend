import { Controller, Get, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";

@Controller("protected")
export class AppController {
    @UseGuards(JwtAuthGuard)
    @Get()
    getProtectedData() {
        return { message: "This is protected data" };
    }
}

import { Controller, Get, Post, Body, Request, UseGuards } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { UNAUTHORIZED } from "@shared/constants/strings.constants";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { AuthService } from "./auth.service";
import { LoginDto, LoginResponseDto } from "./dto/login.dto";
import { UserDto } from '@shared/dto/user.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {
  }

  @Post('login')
  @ApiResponse({ status: 200, type: LoginResponseDto })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 200, type: UserDto })
  @ApiResponse({ status: 401, description: UNAUTHORIZED })
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiResponse({ status: 204, type: 'Success' })
  @ApiResponse({ status: 401, description: UNAUTHORIZED })
  logout(@Request() req) {
    return this.authService.logout(req.user);
  }
}

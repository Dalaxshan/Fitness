import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInRequestDto } from './dto/request/sign-in-req.dto';
import { SignInResponseDto } from './dto/response/sign-in-res.dto';
import { IResponse } from 'src/interfaces/response.interface';
import { RefreshAuthGuard } from './guards/refresh-auth.guard';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signIn(
    @Body() signInDto: SignInRequestDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.signIn(
      signInDto.email,
      signInDto.password,
    );

    const response: IResponse<SignInResponseDto> = {
      statusCode: HttpStatus.OK,
      message: 'Success',
      data: result,
    };

    return response;
  }

  @UseGuards(RefreshAuthGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refreshTokens(
    @Body() body: any,
    @Res({ passthrough: true }) res: Response,
  ) {
    const refreshToken = body.refreshToken;
    const newAuthToken =
      await this.authService.refreshAccessToken(refreshToken);

    const response: IResponse<any> = {
      statusCode: HttpStatus.OK,
      message: 'Success',
      data: newAuthToken,
    };

    return response;
  }
}

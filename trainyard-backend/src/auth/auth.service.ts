import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { AdminService } from 'src/admin/admin.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignInResponseDto } from './dto/response/sign-in-res.dto';
import { jwtConstants } from './auth.constants';
import { AuthTokenDto } from './dto/auth-token.dto';
import { Role } from './enums/role.enum';

@Injectable()
export class AuthService {
  constructor(
    private adminService: AdminService,
    private jwtService: JwtService,
  ) {}

  /**
   * Sign In
   * @param email
   * @param password
   * @returns SignIn Response
   */
  async signIn(email: string, password: string): Promise<SignInResponseDto> {
    const admin = await this.validateUser(email, password);
    const tokens = await this.getTokens(email, admin.role);

    // Update refresh token in database
    await this.updateRefreshToken(email, tokens.refreshToken);

    return {
      name: admin.name,
      email: admin.email,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  /**
   * Validate User
   * @param email
   * @param password
   * @returns Admin User
   */
  async validateUser(email: string, password: string): Promise<any> {
    const admin = await this.adminService.getAdminByEmailWithPassword(email);
    if (!admin) {
      throw new BadRequestException('Invalid Email or Password');
    }
    const isCorrectPassword = await bcrypt.compare(password, admin.password);
    if (!isCorrectPassword) {
      throw new BadRequestException('Invalid Email or Password');
    }
    return admin;
  }

  /**
   * Get Tokens
   * @param username
   * @param role
   * @returns AuthTokenDto
   */
  async getTokens(username: string, role: Role): Promise<AuthTokenDto> {
    const tokens = await Promise.all([
      this.jwtService.signAsync(
        {
          username,
          role,
        },
        {
          secret: jwtConstants.secret,
          expiresIn: '1d',
        },
      ),
      this.jwtService.signAsync(
        {
          username,
          role,
        },
        {
          secret: jwtConstants.refresh_secret,
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken: tokens[0],
      refreshToken: tokens[1],
    };
  }

  /**
   * Refresh Access Token
   * @param username
   * @param refreshToken
   * @returns AuthTokenDto
   */
  async refreshAccessToken(refreshToken: string): Promise<AuthTokenDto> {
    const { username } = await this.jwtService.verifyAsync(refreshToken, {
      secret: jwtConstants.refresh_secret,
    });

    const user = await this.adminService.getAdminByEmail(username);

    if (!user || !user.refreshToken) {
      throw new ForbiddenException('Access Denied');
    }

    const refreshTokenMatches = await bcrypt.compare(
      refreshToken,
      user.refreshToken,
    );

    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.email, user.role);
    await this.updateRefreshToken(user.email, tokens.refreshToken);
    return tokens;
  }

  /**
   *  Update Refresh Token
   * @param email
   * @param refreshToken
   */
  async updateRefreshToken(email: string, refreshToken: string) {
    await this.adminService.updateAdminToken({
      email,
      refreshToken,
    });
  }
}

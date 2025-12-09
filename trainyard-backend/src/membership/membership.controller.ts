import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { IResponse } from 'src/interfaces/response.interface';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateMembershipRequestDto } from './dto/request/create-membership-req.dto';
import { MembershipService } from './membership.service';
import { Role } from 'src/auth/enums/role.enum';
import { AllowedRoles } from 'src/auth/enums/roles.decorator';
import { CreateMembershipResponseDto } from './dto/response/create-membership-res.dto';

@Controller('membership')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MembershipController {
  constructor(private membershipService: MembershipService) {}

  @AllowedRoles(Role.Admin, Role.SuperAdmin)
  @Post()
  async createNewMembership(
    @Body() createMembershipDto: CreateMembershipRequestDto,
  ): Promise<IResponse<CreateMembershipResponseDto>> {
    await this.membershipService.createNewMembership(createMembershipDto);

    const response: IResponse<CreateMembershipResponseDto> = {
      statusCode: HttpStatus.CREATED,
      message: 'Membership created',
    };

    return response;
  }

  @AllowedRoles(Role.Admin, Role.SuperAdmin)
  @Get()
  async getAllMembership(): Promise<IResponse<CreateMembershipResponseDto[]>> {
    const memberships = await this.membershipService.getAllMemberships();

    const response: IResponse<CreateMembershipResponseDto[]> = {
      statusCode: HttpStatus.OK,
      message: 'All memberships',
      data: memberships,
    };

    return response;
  }

  @Get('/search')
  async searchMemberships(
    @Query('memberId') memberId: string,
    @Query('packageId') packageId: string,
  ) {
    const memberships = await this.membershipService.searchMemberships(
      memberId,
      packageId,
    );

    const response: IResponse<CreateMembershipResponseDto[]> = {
      statusCode: HttpStatus.OK,
      message: 'Memberships found',
      data: memberships,
    };

    return response;
  }
}

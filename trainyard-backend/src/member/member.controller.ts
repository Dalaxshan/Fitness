import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { IResponse } from 'src/interfaces/response.interface';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AllowedRoles } from 'src/auth/enums/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { MemberService } from './member.service';
import { CreateMemberRequestDto } from './dto/request/create-member-req.dto';
import { CreateMemberResponseDto } from './dto/response/create-member-res.dto';

@Controller('member')
// @UseGuards(JwtAuthGuard, RolesGuard)
export class MemberController {
  constructor(private memberService: MemberService) {}

  @AllowedRoles(Role.Admin, Role.SuperAdmin)
  @Get()
  async getAllMembers() {
    const members = await this.memberService.getAllMembers();

    return {
      statusCode: HttpStatus.OK,
      message: 'Success',
      data: members,
    };
  }

  @Post()
  async registerNewMember(
    @Body() createMemberDto: CreateMemberRequestDto,
  ): Promise<IResponse<CreateMemberResponseDto>> {
    const member = await this.memberService.registerNewMember(createMemberDto);

    const response: IResponse<CreateMemberResponseDto> = {
      statusCode: HttpStatus.CREATED,
      message: 'Member registered successfully',
      data: member,
    };

    return response;
  }

  @AllowedRoles(Role.Admin, Role.SuperAdmin)
  @Get(':id')
  async getMemberById(@Param('id') id: string) {
    const members = await this.memberService.getMemberById(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'Success',
      data: members,
    };
  }

  @AllowedRoles(Role.Admin, Role.SuperAdmin)
  @Put(':id')
  async updateMember(
    @Param('id') id: string,
    @Body() updateMemberDto: CreateMemberRequestDto,
  ) {
    const updatedMember = await this.memberService.editMember(
      id,
      updateMemberDto,
    );

    return {
      statusCode: HttpStatus.OK,
      message: 'Success',
      data: updatedMember,
    };
  }

  @AllowedRoles(Role.Admin, Role.SuperAdmin)
  @Delete(':id')
  async deleteMember(@Param('id') id: string) {
    await this.memberService.deleteMember(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'Success',
    };
  }
}

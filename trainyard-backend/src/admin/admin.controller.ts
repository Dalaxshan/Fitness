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
import { ApiOkResponse } from '@nestjs/swagger';
import { IResponse } from 'src/interfaces/response.interface';
import { AdminService } from './admin.service';
import { CreateAdminRequestDto } from './dto/request/create-admin-req.dto';
import { CreateAdminResponseDto } from './dto/response/create-admin-res.dto';
import { AllowedRoles } from 'src/auth/enums/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { updateAdminReqDto } from './dto/request/update-admin-req';

@Controller('admin')
// @UseGuards(JwtAuthGuard, RolesGuard)
export class AdminController {
  constructor(private adminService: AdminService) {}

  @AllowedRoles(Role.Admin, Role.SuperAdmin)
  @ApiOkResponse({ type: CreateAdminResponseDto })
  @Get()
  async getAdmins() {
    const admins = await this.adminService.getAdmins();

    return {
      statusCode: HttpStatus.OK,
      message: 'Success',
      data: admins,
    };
  }

  @AllowedRoles(Role.Admin, Role.SuperAdmin)
  @Get(':id')
  async getAdminById(@Param('id') id: string) {
    const admin = await this.adminService.getAdminById(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'Success',
      data: admin,
    };
  }

  @AllowedRoles(Role.SuperAdmin)
  @Post()
  async createAdminUser(
    @Body() createAdminDto: CreateAdminRequestDto,
  ): Promise<IResponse<CreateAdminResponseDto>> {
    const newAdmin = await this.adminService.createAdminUser(createAdminDto);

    const response: IResponse<CreateAdminResponseDto> = {
      statusCode: HttpStatus.CREATED,
      message: 'Admin user created successfully',
      data: newAdmin,
    };

    return response;
  }

  @AllowedRoles(Role.SuperAdmin)
  @Put(':id')
  async updateAdminUser(
    @Param('id') id: string,
    @Body() updateAdminDto: updateAdminReqDto,
  ) {
    const updatedAdmin = await this.adminService.updateAdmin(
      id,
      updateAdminDto,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Admin updated successfully',
      data: updatedAdmin,
    };
  }

  @AllowedRoles(Role.SuperAdmin)
  @Delete(':id')
  async deleteAdminUser(@Param('id') id: string) {
    const deleteAdminUser = await this.adminService.deleteAdminUser(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Admin user deleted successfully',
    };
  }
}

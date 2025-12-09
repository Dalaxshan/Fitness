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
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { PackageService } from './package.service';
import { CreatePackageResponseDto } from './dto/res/create-package-res.dto';
import { CreatePackageRequestDto } from './dto/req/create-package-req.dto';
import { AllowedRoles } from 'src/auth/enums/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { UpdatePackageResponseDto } from './dto/res/update-package-res.dto';

@Controller('package')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PackageController {
  constructor(private packageService: PackageService) {}

  @AllowedRoles(Role.Admin, Role.SuperAdmin)
  @ApiOkResponse({ type: CreatePackageResponseDto })
  @Post()
  async createPackage(
    @Body() createPackageDto: CreatePackageRequestDto,
  ): Promise<IResponse<CreatePackageResponseDto>> {
    const newPackage =
      await this.packageService.createPackage(createPackageDto);

    const response: IResponse<CreatePackageResponseDto> = {
      statusCode: HttpStatus.CREATED,
      message: 'Package created successfully',
      data: newPackage,
    };

    return response;
  }

  @AllowedRoles(Role.Admin, Role.SuperAdmin)
  @ApiOkResponse({ type: CreatePackageResponseDto })
  @Get()
  async getPackages() {
    const packages = await this.packageService.getAllPackages();

    return {
      statusCode: HttpStatus.OK,
      message: 'Success',
      data: packages,
    };
  }

  @AllowedRoles(Role.Admin, Role.SuperAdmin)
  @ApiOkResponse({ type: UpdatePackageResponseDto })
  @Put(':id')
  async updatePackage(
    @Param('id') id: string,
    @Body() updatePackageDto: UpdatePackageResponseDto,
  ) {
    const updatedPackage = await this.packageService.editPackage(
      id,
      updatePackageDto,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Package updated successfully',
      data: updatedPackage,
    };
  }

  @AllowedRoles(Role.Admin, Role.SuperAdmin)
  @Get(':id')
  async getPackageById(@Param('id') id: string) {
    const packages = await this.packageService.getPackageById(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Success',
      data: packages,
    };
  }

  @AllowedRoles(Role.Admin, Role.SuperAdmin)
  @Delete(':id')
  async deletePackage(@Param('id') id: string) {
    await this.packageService.deletePackage(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Successfully deleted package',
    };
  }
}

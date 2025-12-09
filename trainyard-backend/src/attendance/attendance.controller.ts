import { AllowedRoles } from 'src/auth/enums/roles.decorator';
import { AttendanceService } from './attendance.service';
import { ApiOkResponse } from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateAttendanceReqDto } from './req/create-attendance-req-dto';
import { CreateAttendanceResDto } from './res/create-attendance-res.dto';
import { Role } from 'src/auth/enums/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateAttendanceReqDto } from './req/update-attendance-req-dto';

@Controller('attendance')
@UseGuards(JwtAuthGuard, RolesGuard)
export class AttendanceController {
  constructor(private attendanceService: AttendanceService) {}

  @AllowedRoles(Role.Admin, Role.SuperAdmin)
  @ApiOkResponse({ type: CreateAttendanceResDto })
  @Post()
  async createAttendance(
    @Body() createAttendanceReqDto: CreateAttendanceReqDto,
  ) {
    const newAttendance = await this.attendanceService.createAttendance(
      createAttendanceReqDto,
    );
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Attendance created successfully',
      data: newAttendance,
    };
  }

  @AllowedRoles(Role.Admin, Role.SuperAdmin)
  @Get()
  async getAllAttendance() {
    const allAttendance = await this.attendanceService.getAllAttendance();
    return {
      statusCode: HttpStatus.OK,
      message: 'All Attendance retrieved successfully',
      data: allAttendance,
    };
  }

  @AllowedRoles(Role.Admin, Role.SuperAdmin)
  @Get(':attendanceId')
  async getAttendanceById(@Param('attendanceId') attendanceId: string) {
    const attendance =
      await this.attendanceService.getAttendanceById(attendanceId);
    return {
      statusCode: HttpStatus.OK,
      message: 'Attendance retrieved successfully',
      data: attendance,
    };
  }

  @AllowedRoles(Role.Admin, Role.SuperAdmin)
  @Put(':id')
  async updateAttendance(
    @Param('id') id: string,
    @Body() updateAttendanceDto: UpdateAttendanceReqDto,
  ) {
    const updatedAttendance = await this.attendanceService.updateAttendance(
      id,
      updateAttendanceDto,
    );

    return {
      statusCode: HttpStatus.OK,
      message: 'Success',
      data: updatedAttendance,
    };
  }

  @Get('/search/:date')
  async getAllAttendancebyDay(@Param('date') date: string) {
    console.log(date);

    const allAttendance =
      await this.attendanceService.getAttendanceByDate(date);
    return {
      statusCode: HttpStatus.OK,
      message: 'All Attendance for today retrieved successfully',
      data: allAttendance,
    };
  }
}

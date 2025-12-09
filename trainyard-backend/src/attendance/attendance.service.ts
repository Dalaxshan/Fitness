import { InjectModel } from '@nestjs/mongoose';
import { AttendanceModel } from './attendance.model';
import { Model } from 'mongoose';
import { CreateAttendanceReqDto } from './req/create-attendance-req-dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UpdateAttendanceReqDto } from './req/update-attendance-req-dto';

export class AttendanceService {
  constructor(
    @InjectModel('Attendance')
    private readonly attendanceModel: Model<AttendanceModel>,
  ) {}

  /***
   * Check if the member already checked in
   * @param attendance CreateAttendanceReqDto
   * @returns boolean
   */
  async memberCheckIn(attendance: CreateAttendanceReqDto) {
    const member = await this.attendanceModel
      .findOne({
        member: attendance.member,
        checkOut: null,
      })
      .exec();

    if (member) {
      return true; // Member is checked in
    }
    return false; // Member is not checked in
  }

  /**
   * Create attendance
   * @param createAttendanceReqDto CreateAttendanceReqDto
   * @returns Attendance
   */
  async createAttendance(createAttendanceReqDto: CreateAttendanceReqDto) {
    // Check if the member already checked in
    const memberCheckedIn = await this.memberCheckIn(createAttendanceReqDto);

    if (memberCheckedIn) {
      throw new HttpException(
        'Member already checked in',
        HttpStatus.BAD_REQUEST,
      );
    }

    let status = '';

    if (
      createAttendanceReqDto.checkIn &&
      createAttendanceReqDto.checkOut === null
    ) {
      status = 'In';
    } else if (
      createAttendanceReqDto.checkIn &&
      createAttendanceReqDto.checkOut
    ) {
      status = 'Out';
    }

    const attendance = new this.attendanceModel({
      ...createAttendanceReqDto,
      status: status,
    });

    const newAttendance = await attendance.save();
    return newAttendance;
  }

  /**
   * Get all attendance records
   * @returns All Attendance records
   */
  async getAllAttendance() {
    const currentDate = new Date();
    const startOfToday = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      0,
      0,
      0,
    );
    const endOfToday = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
      23,
      59,
      59,
    );

    const attendanceForToday = await this.attendanceModel
      .find({
        checkIn: { $gte: startOfToday, $lte: endOfToday },
      })
      .populate({
        path: 'member',
        select: 'firstName lastName contactNumber vehicleRegNo',
      })
      .exec();

    return attendanceForToday;
  }

  /**
   * Get attendance by id
   * @param attendanceId Attendance
   * @returns Attendance
   */
  async getAttendanceById(attendanceId: string) {
    const attendance = await this.attendanceModel
      .findById(attendanceId)
      .populate({
        path: 'member',
        select: 'firstName lastName constactNumber vehileRegNo ',
      })
      .exec();
    return attendance;
  }

  /**
   * Edit Attendance User
   * @param id Attendance User ID
   * return Updated Attendance
   */

  async updateAttendance(
    id: string,
    updateAttendanceReqDto: UpdateAttendanceReqDto,
  ) {
    // Check if the attendance exists
    const attendanceExists = await this.attendanceModel.findById(id).exec();
    if (!attendanceExists) {
      throw new HttpException(
        'Attendance does not exist',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (updateAttendanceReqDto.checkIn && !updateAttendanceReqDto.checkOut) {
      updateAttendanceReqDto.status = 'In';
    } else if (
      updateAttendanceReqDto.checkIn &&
      updateAttendanceReqDto.checkOut
    ) {
      updateAttendanceReqDto.status = 'Out';
    }

    // Update the attendance and return the edited attendance
    const editedAttendance = await this.attendanceModel
      .findOneAndUpdate({ _id: id }, updateAttendanceReqDto, { new: true })
      .exec();

    return editedAttendance;
  }

  async getAttendanceByDate(date: string) {
    const startOfDate = new Date(date);
    const endOfDate = new Date(
      startOfDate.getFullYear(),
      startOfDate.getMonth(),
      startOfDate.getDate(),
      23,
      59,
      59,
    );

    const attendanceForDate = await this.attendanceModel
      .find({
        checkIn: { $gte: startOfDate, $lte: endOfDate },
      })
      .populate({
        path: 'member',
        select: 'firstName lastName contactNumber vehicleRegNo',
      })
      .exec();

    return attendanceForDate;
  }
}

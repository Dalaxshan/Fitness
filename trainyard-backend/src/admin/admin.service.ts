import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdminModel } from './admin.model';
import * as bcrypt from 'bcrypt';
import { CreateAdminRequestDto } from './dto/request/create-admin-req.dto';
import { UpdateAdminTokenDto } from './dto/request/update-admin-token.dto';
import { updateAdminReqDto } from './dto/request/update-admin-req';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel('Admin') private readonly adminModel: Model<AdminModel>,
  ) {}

  /**
   * Get All Admin Users
   * @returns All Admin users
   */
  async getAdmins() {
    const admins = await this.adminModel.find().exec();
    return admins;
  }

  /**
   * Get Admin User by ID
   * @param id Admin User ID
   * @returns Admin User
   */
  async getAdminById(id: string) {
    const admin = await this.adminModel.findById(id).exec();
    return admin;
  }

  /**
   * Get Admin User by Email
   * @param email admin email
   * @returns Admin User
   */
  async getAdminByEmail(email: string) {
    const admin = await this.adminModel.findOne({ email }).exec();
    return admin;
  }

  /**
   * Get Admin user with hashed password
   * @param email admin email
   * @returns Admin user with hashed password
   */
  async getAdminByEmailWithPassword(email: string) {
    const admin = await this.adminModel.findOne({ email }).select('+password');
    return admin;
  }

  /**
   * Create Admin User
   * @param createAdminDto Create Admin DTO
   * @returns Created Admin User
   */
  async createAdminUser(createAdminDto: CreateAdminRequestDto) {
    const adminExists = await this.getAdminByEmail(createAdminDto.email);
    if (adminExists) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(createAdminDto.password, 10);

    const newAdmin = new this.adminModel({
      name: createAdminDto.name,
      email: createAdminDto.email,
      password: hashedPassword,
      role: createAdminDto.role,
    });

    const result = await newAdmin.save();
    return result;
  }

  async updateAdminToken(updateAdminTokenDto: UpdateAdminTokenDto) {
    const adminExists = await this.getAdminByEmail(updateAdminTokenDto.email);
    if (adminExists) {
      const hashedToken = await bcrypt.hash(
        updateAdminTokenDto.refreshToken,
        10,
      );
      Object.assign(adminExists, {
        refreshToken: hashedToken,
      });
      await adminExists.save();
    } else {
      throw new ForbiddenException('User does not exist');
    }

    return true;
  }

  /**
   * Edit Admin User
   * @param id Admin User ID
   * return Updated Admin
   */

  async updateAdmin(id: string, updateAdminReqDto: updateAdminReqDto) {
    // Check if the admin exists
    const adminExists = await this.adminModel.findById(id).exec();
    if (!adminExists) {
      throw new HttpException('Admin does not exist', HttpStatus.BAD_REQUEST);
    }

    // Update the admin and return the edited admin
    const editedAdmin = await this.adminModel
      .findOneAndUpdate({ _id: id }, updateAdminReqDto, { new: true })
      .exec();

    return editedAdmin;
  }

  /**
   * Delete Admin User
   * @param id Admin User ID
   */
  async deleteAdminUser(id: string) {
    const adminExists = await this.adminModel.findById(id);

    if (!adminExists) {
      throw new HttpException('Admin not found', HttpStatus.BAD_REQUEST);
    } else {
      await adminExists.deleteOne();
    }
  }
}

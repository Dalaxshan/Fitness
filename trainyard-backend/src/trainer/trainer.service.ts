import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TrainerModel } from './trainer.model';
import * as bcrypt from 'bcrypt';
import { CreateTrainerRequestDto } from './req/create.trainer.req.dto';

@Injectable()
export class TrainerService {
  constructor(
    @InjectModel('Trainer')
    private readonly TrainerModel: Model<TrainerModel>,
  ) {}

  /**
   * Get Trainer User by Email
   * @param email Trainer email
   * @returns Trainer User
   */
  async getTrainerByEmail(email: string) {
    const Trainer = await this.TrainerModel.findOne({ email }).exec();
    return Trainer;
  }

  /**
   * Create Trainer User
   * @param createTrainerDto Create Trainer DTO
   * @returns Created Trainer User
   */
  async createTrainerUser(createTrainerDto: CreateTrainerRequestDto) {
    const TrainerExists = await this.getTrainerByEmail(createTrainerDto.email);
    if (TrainerExists) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }

    const newTrainer = new this.TrainerModel({
      name: createTrainerDto.name,
      nicNo: createTrainerDto.nicNo,
      address: createTrainerDto.address,
      contactNo: createTrainerDto.contactNo,
      email: createTrainerDto.email,
      emergencyContactNo: createTrainerDto.emergencyContactNo,
      memberName: createTrainerDto.memberName,
      startDate: createTrainerDto.startDate,
      endDate: createTrainerDto.endDate,
      amount: createTrainerDto.amount,
    });
    const result = await newTrainer.save();
    return result;
  }

  /**
   * Get all Trainer Users
   * @returns Trainer Users
   */
  async getAllTrainerUsers() {
    const trainers = await this.TrainerModel.find().exec();
    return trainers;
  }

  /**
   * Delete Trainer
   * @param id Trainer ID
   * @returns Deleted Trainer
   */
  async deleteTrainer(id: string) {
    const deletedTrainer = await this.TrainerModel.findByIdAndRemove(id).exec();
    return deletedTrainer;
  }
}

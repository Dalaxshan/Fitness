import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { TrainerService } from './trainer.service';
import { CreateTrainerRequestDto } from './req/create.trainer.req.dto';
import { CreateTrainerResponseDto } from './res/create.trainer.res.dto';
import { Role } from 'src/auth/enums/role.enum';
import { AllowedRoles } from 'src/auth/enums/roles.decorator';

@Controller('trainer')
export class TrainerController {
  constructor(private TrainerService: TrainerService) {}

  //create trainer user
  @AllowedRoles(Role.Admin, Role.SuperAdmin)
  @ApiOkResponse({ type: CreateTrainerResponseDto })
  @Post()
  async createTrainerUser(@Body() createTrainerDto: CreateTrainerRequestDto) {
    const newTrainer =
      await this.TrainerService.createTrainerUser(createTrainerDto);

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Trainer user created successfully',
      data: newTrainer,
    };
  }

  //get all trainer users
  @AllowedRoles(Role.Admin, Role.SuperAdmin)
  @ApiOkResponse({ type: CreateTrainerResponseDto, isArray: true })
  @Get()
  async getAllTrainerUsers() {
    const trainers = await this.TrainerService.getAllTrainerUsers();
    return {
      statusCode: HttpStatus.OK,
      message: 'Trainer users fetched successfully',
      data: trainers,
    };
  }

  //delete trainer
  @AllowedRoles(Role.Admin, Role.SuperAdmin)
  @Delete(':id')
  async deleteTrainer(@Param('id') id: string) {
    await this.TrainerService.deleteTrainer(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Trainer deleted successfully',
    };
  }
}

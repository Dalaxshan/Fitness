import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TrainerController } from './trainer.controller';
import { TrainerService } from './trainer.service';
import { TrainerSchema } from './trainer.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Trainer', schema: TrainerSchema }]),
  ],
  controllers: [TrainerController],
  exports: [TrainerService],
  providers: [TrainerService],
})
export class TrainerModule {}

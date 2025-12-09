import { Module } from '@nestjs/common';
import { SMSService } from './sms.service';
import { HttpModule } from '@nestjs/axios';
import { SMSController } from './sms.controller';

@Module({
  imports: [HttpModule],
  exports: [SMSService],
  controllers: [SMSController],
  providers: [SMSService],
})
export class SMSModule {}

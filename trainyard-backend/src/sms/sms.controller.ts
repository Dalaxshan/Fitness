import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { SMSService } from './sms.service';
import { DialogSendSMSDto } from './dto/dialog.send-sms.dto';
import { IResponse } from 'src/interfaces/response.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('SMS')
@Controller('dialog-sms')
export class SMSController {
  constructor(private smsService: SMSService) {}

  @Post()
  async sampleSMS(@Body() sendSMS: DialogSendSMSDto) {
    await this.smsService.sendSMS(sendSMS);

    const response: IResponse<string> = {
      statusCode: HttpStatus.OK,
      message: 'SMS Sent Successfully',
      data: 'SMS Sent Successfully',
    };

    return response;
  }
}

import { HttpService } from '@nestjs/axios';
import { DialogAuthDto } from './dto/dialog.auth.dto';
import { DialogSendSMSDto } from './dto/dialog.send-sms.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SMSService {
  constructor(private readonly httpService: HttpService) {}

  private static dialog = {
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMwNzksInVzZXJuYW1lIjoiVHJhaW5ZYXJkY2FmZSIsIm1vYmlsZSI6Nzc2MjkxMjkyLCJlbWFpbCI6Ikt1c2hhbi5TYW1hcmFzaW5oYUBzaGFuZ3JpLWxhLmNvbSIsImN1c3RvbWVyX3JvbGUiOjAsImlhdCI6MTcwOTcwODEzMCwiZXhwIjoxNzA5NzUxMzMwfQ.sYQh5P8Mae2ZmufLwhZF15E46JxHR6Fy4NahCEj1Ccc',
    refreshToken: '',
    expiration: 0,
    refreshExpiration: 0,
  };

  private static dialogLoginUrl = 'https://e-sms.dialog.lk/api/v1/login';
  private static dialogSendSMSUrl = 'https://e-sms.dialog.lk/api/v2/sms';

  private generateTransactionId() {
    let randomNumber = 0;
    for (let i = 0; i < 18; i++) {
      randomNumber += Math.floor(Math.random() * 10);
    }
    return randomNumber;
  }

  async authenticateDialog() {
    const response = await this.httpService
      .post<DialogAuthDto>(SMSService.dialogLoginUrl, {
        username: 'Trainyardcafe',
        password: 'Train@12345',
      })
      .toPromise();

    SMSService.dialog = {
      token: response.data.token,
      refreshToken: response.data.refreshToken,
      expiration: response.data.expiration,
      refreshExpiration: response.data.refreshExpiration,
    };

    return response.data;
  }

  async sendSMS(sendSMSDto: DialogSendSMSDto) {
    let response = null;
    try {
      response = await this.httpService.axiosRef.post(
        SMSService.dialogSendSMSUrl,
        {
          msisdn: sendSMSDto.msisdn,
          transaction_id: this.generateTransactionId(),
          message: sendSMSDto.message,
        },
        { headers: { Authorization: `Bearer ${SMSService.dialog.token}` } },
      );
    } catch (error) {
      if (error.response.status === 401) {
        await this.authenticateDialog();
        response = await this.httpService.axiosRef.post(
          SMSService.dialogSendSMSUrl,
          {
            msisdn: sendSMSDto.msisdn,
            transaction_id: this.generateTransactionId(),
            message: sendSMSDto.message,
          },
          { headers: { Authorization: `Bearer ${SMSService.dialog.token}` } },
        );
      }
    }

    return response;
  }
}

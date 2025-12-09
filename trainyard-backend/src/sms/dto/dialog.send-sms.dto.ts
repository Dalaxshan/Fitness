export class DialogSendSMSDto {
  msisdn: MSISDN[];
  transaction_id?: number;
  message: string;
}

class MSISDN {
  mobile: string;
}

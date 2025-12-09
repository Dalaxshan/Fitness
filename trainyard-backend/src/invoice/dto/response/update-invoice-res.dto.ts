import { ApiProperty } from '@nestjs/swagger';

export class UpdateInvoiceResponseDto {
  @ApiProperty()
  customerName: string;

  @ApiProperty()
  customerEmail: string;

  @ApiProperty()
  customerMobile: string;

  @ApiProperty()
  customerAddress: string;

  @ApiProperty()
  totalAmount: string;

  @ApiProperty()
  issuedDate: Date;

  @ApiProperty()
  dueDate: Date;

  @ApiProperty()
  invoiceNumber: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  description: string;
}

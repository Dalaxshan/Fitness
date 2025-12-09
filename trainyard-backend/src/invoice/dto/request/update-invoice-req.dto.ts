import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsNumber, IsString } from 'class-validator';

export class UpdateInvoiceRequestDto {
  @ApiProperty()
  @IsString()
  customerName: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  customerEmail: string;

  @ApiProperty()
  @IsString()
  customerMobile: string;

  @ApiProperty()
  @IsString()
  customerAddress: string;

  @ApiProperty()
  @IsString()
  totalAmount: string;

  @ApiProperty()
  @IsDateString()
  issuedDate: Date;

  @ApiProperty()
  @IsDateString()
  dueDate: Date;

  @ApiProperty()
  @IsString()
  status: string;

  @ApiProperty()
  @IsString()
  description: string;
}

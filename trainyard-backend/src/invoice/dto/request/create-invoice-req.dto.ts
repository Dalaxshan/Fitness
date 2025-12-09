import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsMongoId,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateInvoiceRequestDto {
  @IsMongoId()
  @IsString()
  @IsOptional()
  memberId?: string;

  @ApiProperty()
  @IsString()
  customerName: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsEmail()
  customerEmail?: string;

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

import { ApiProperty } from '@nestjs/swagger';

import {
  IsEmail,
  IsMongoId,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';
import { MemberModel } from 'src/member/member.model';

export class CreateTrainerRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString({ message: 'Name must be a string' })
  @Length(3, 50, { message: 'Name must be between 3 and 50 characters' })
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString({ message: 'NIC number must be a string' })
  nicNo: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString({ message: 'Address must be a string' })
  address: string;

  @ApiProperty()
  @IsString({ message: 'Phone number must be a string' })
  contactNo: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString({ message: 'Phone number must be a string' })
  emergencyContactNo: string;

  @ApiProperty()
  memberName: string;

  @ApiProperty()
  startDate: Date;

  @ApiProperty()
  endDate: Date;

  @ApiProperty()
  amount: string;

  // @ApiProperty()
  // @IsMongoId()
  // member: MemberModel;
}

import { ApiProperty } from '@nestjs/swagger';

import { IsEmail, IsMongoId, IsNotEmpty, IsPhoneNumber } from 'class-validator';
import { MemberModel } from 'src/member/member.model';

export class CreateTrainerResponseDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  nicNo: string;

  @ApiProperty()
  @IsNotEmpty()
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsPhoneNumber()
  contactNo: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsPhoneNumber()
  emergencyContactNo: string;

  @ApiProperty()
  memberName: string;

  @ApiProperty()
  startDate: Date;

  @ApiProperty()
  @ApiProperty()
  endDate: Date;

  @ApiProperty()
  amount: string;

  // @ApiProperty()
  // @IsMongoId()
  // member: MemberModel;
}

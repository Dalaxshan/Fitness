import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { MemberModel } from 'src/member/member.model';

export class CreateAttendanceReqDto {
  @ApiProperty()
  @IsMongoId()
  member: string;

  @ApiProperty()
  @IsDateString()
  checkIn: Date;

  @ApiProperty()
  @IsDateString()
  @IsOptional()
  checkOut: Date;

  @ApiProperty()
  @IsOptional()
  status: string;
}

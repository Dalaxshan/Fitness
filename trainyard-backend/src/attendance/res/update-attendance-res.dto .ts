import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsMongoId, IsString } from 'class-validator';
import { MemberModel } from 'src/member/member.model';

export class UpdateAttendanceResDto {
  @ApiProperty()
  @IsMongoId()
  member: string;

  @ApiProperty()
  @IsDateString()
  checkIn: Date;

  @ApiProperty()
  @IsDateString()
  checkOut: Date;

  @ApiProperty()
  @IsString()
  status: String;
}

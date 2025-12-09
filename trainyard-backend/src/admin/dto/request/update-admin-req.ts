import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class updateAdminReqDto {
  @ApiProperty()
  @IsString({ message: 'Name must be a string' })
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;
}

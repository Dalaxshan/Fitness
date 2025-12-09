import { ApiProperty } from '@nestjs/swagger';

export class updateAdminResDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;
}

import { ApiProperty } from '@nestjs/swagger';

export class CreateAdminResponseDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;
}

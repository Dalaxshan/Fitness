import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';
import { Role } from 'src/auth/enums/role.enum';

export class CreateAdminRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString({ message: '  Name must be a string' })
  @Length(3, 50, { message: 'Name must be between 3 and 50 characters' })
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString({ message: 'Password must be a string' })
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString({ message: 'Role must have Admin , Super Admin' })
  @IsEnum(Role)
  role: Role;
}

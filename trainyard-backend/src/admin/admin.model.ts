import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from 'src/auth/enums/role.enum';

@Schema({ timestamps: true })
export class AdminModel {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  email: string;

  @Prop({
    required: true,
    select: false,
  })
  password: string;

  @Prop()
  role: Role;

  @Prop()
  status: string;

  @Prop()
  refreshToken: string;
}

export const AdminSchema = SchemaFactory.createForClass(AdminModel);

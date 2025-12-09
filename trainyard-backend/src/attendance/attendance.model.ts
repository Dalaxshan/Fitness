import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { MemberModel } from 'src/member/member.model';

@Schema({ timestamps: true })
export class AttendanceModel {
  @Prop({
    type: Types.ObjectId,
    ref: 'Member',
    required: true,
  })
  member: MemberModel;

  @Prop()
  checkIn: Date;

  @Prop()
  checkOut: Date;

  @Prop()
  status: String;
}

export const AttendanceSchema = SchemaFactory.createForClass(AttendanceModel);

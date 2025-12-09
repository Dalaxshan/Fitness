import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class MembershipModel {
  @Prop({
    type: Types.ObjectId,
    ref: 'Member',
    required: true,
  })
  memberId: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'Package',
    required: true,
  })
  packageId: string;

  @Prop({
    type: Date,
    required: false,
  })
  startDate: Date;

  @Prop({
    type: Date,
    required: false,
  })
  endDate: Date;

  @Prop({
    type: String,
    required: false,
  })
  totalAmount: string;
}

export const MembershipSchema = SchemaFactory.createForClass(MembershipModel);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { InvoiceStatus } from '../common/enums/invoice-status.enum';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class InvoiceModel {
  @Prop({
    type: Types.ObjectId,
    ref: 'Member',
    required: false,
  })
  memberId: Types.ObjectId;

  @Prop({
    required: true,
  })
  customerName: string;

  @Prop({
    required: false,
  })
  customerEmail: string;

  @Prop({
    required: true,
  })
  customerMobile: string;

  @Prop({
    required: true,
  })
  customerAddress: string;

  @Prop({
    type: Date,
    required: true,
  })
  issuedDate: Date;

  @Prop({
    type: Date,
    required: true,
  })
  dueDate: Date;

  @Prop({
    required: true,
  })
  invoiceNumber: string;

  @Prop({
    type: String,
    required: true,
    enum: [InvoiceStatus.Paid, InvoiceStatus.Unpaid, InvoiceStatus.Pending],
  })
  status: string;

  @Prop({
    required: true,
  })
  totalAmount: string;

  @Prop({
    required: true,
  })
  description: string;
}

export const InvoiceSchema = SchemaFactory.createForClass(InvoiceModel);

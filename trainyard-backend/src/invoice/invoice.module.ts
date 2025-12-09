import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { InvoiceSchema } from './invoice.model';
import { MemberModule } from 'src/member/member.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Invoice', schema: InvoiceSchema }]),
    MemberModule,
  ],
  controllers: [InvoiceController],
  exports: [InvoiceService],
  providers: [InvoiceService],
})
export class InvoiceModule {}

import { InjectModel } from '@nestjs/mongoose';
import { InvoiceModel } from './invoice.model';
import { Model } from 'mongoose';
import { CreateInvoiceRequestDto } from './dto/request/create-invoice-req.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UpdateInvoiceRequestDto } from './dto/request/update-invoice-req.dto';
import { MemberService } from 'src/member/member.service';
import { InvoiceNumber } from 'invoice-number';

export class InvoiceService {
  constructor(
    @InjectModel('Invoice') private readonly invoiceModel: Model<InvoiceModel>,
    private memberService: MemberService,
  ) {}

  /**
   * Generates new Invoice Number
   * @returns New report number
   */
  generateInvoiceNumber = (lastReportNumber: string) => {
    const currentDate = new Date();
    const year = currentDate.getFullYear() - 2000; // Get the last two digits of the year
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Get the month as two digits
    const day = String(currentDate.getDate()).padStart(2, '0'); // Get the day as two digits

    const lastReportDate = lastReportNumber.slice(3, 9);

    if (lastReportDate !== `${year}${month}${day}`) {
      return `TY-${year}${month}${day}0001`;
    } else {
      // const lastReportEndNumber = parseInt(lastReportNumber.slice(-4)) + 1;
      // const pattern = `TY-${year}${month}${day}${lastReportEndNumber}`;
      const pattern = InvoiceNumber.next(lastReportNumber);
      return pattern;
    }
  };

  /**
   * Get All invoices
   * @returns All invoices
   */
  async getAllInvoices() {
    const invoices = await this.invoiceModel
      .find()
      .populate('memberId', {
        firstName: 1,
        lastName: 1,
        email: 1,
        contactNumber: 1,
        customerAddress: 1,
      })
      .sort({ createdAt: -1 })
      .exec();
    return invoices;
  }

  /**
   * Get Invoice by Id
   * @param id invoice id
   * @returns Invoice
   */

  async getInvoiceById(id: string) {
    const invoices = await this.invoiceModel.findById(id).exec();
    return invoices;
  }

  /**
   * Create Invoice
   * @param createInvoiceDto Create Invoice DTO
   * @returns Created Invoice
   */
  async createInvoice(createInvoiceDto: CreateInvoiceRequestDto) {
    const lastInvoice = await this.invoiceModel
      .findOne()
      .sort({ createdAt: -1 })
      .exec();

    console.log(lastInvoice.invoiceNumber);

    const newInvoiceNumber = this.generateInvoiceNumber(
      lastInvoice.invoiceNumber,
    );

    console.log(newInvoiceNumber);

    // Check if the member exists
    let member;
    if (createInvoiceDto.memberId) {
      member = await this.memberService.getMemberById(
        createInvoiceDto.memberId,
      );
    }

    const newInvoice = await this.invoiceModel.create({
      invoiceNumber: newInvoiceNumber,
      ...createInvoiceDto,
    });
    return newInvoice;
  }

  /**
   * Edit Invoice
   * @param invoiceId ID of the invoice to be edited
   * @param updateInvoiceDto Data for updating the invoice
   * @returns Edited Invoice
   */
  async editInvoice(
    invoiceId: string,
    updateInvoiceDto: UpdateInvoiceRequestDto,
  ) {
    // Check if the invoice exists
    const invoiceExists = await this.invoiceModel.findById(invoiceId).exec();
    if (!invoiceExists) {
      throw new HttpException('Invoice does not exist', HttpStatus.BAD_REQUEST);
    }

    // Update the invoice and return the edited invoice
    const editedInvoice = await this.invoiceModel
      .findOneAndUpdate({ _id: invoiceId }, updateInvoiceDto, { new: true })
      .exec();

    return editedInvoice;
  }

  /**
   * Delete Invoice
   * @param name invoice name
   * @returns Deleted Invoice
   */
  async deleteInvoice(id: string) {
    const deletedInvoice = await this.invoiceModel
      .findOneAndDelete({ id })
      .exec();
    return deletedInvoice;
  }
}

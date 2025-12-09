import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { IResponse } from 'src/interfaces/response.interface';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceResponseDto } from './dto/response/create-invoice-res.dto';
import { CreateInvoiceRequestDto } from './dto/request/create-invoice-req.dto';
import { UpdateInvoiceResponseDto } from './dto/response/update-invoice-res.dto';

@Controller('invoice')
@UseGuards(JwtAuthGuard, RolesGuard)
export class InvoiceController {
  constructor(private invoiceService: InvoiceService) {}

  @ApiOkResponse({ type: CreateInvoiceResponseDto })
  @Post()
  async createInvoice(
    @Body() createInvoiceDto: CreateInvoiceRequestDto,
  ): Promise<IResponse<CreateInvoiceResponseDto>> {
    const newInvoice =
      await this.invoiceService.createInvoice(createInvoiceDto);

    const response: IResponse<CreateInvoiceResponseDto> = {
      statusCode: HttpStatus.CREATED,
      message: 'Invoice created successfully',
      data: newInvoice,
    };

    return response;
  }

  @ApiOkResponse({ type: CreateInvoiceResponseDto })
  @Get()
  async getInvoices() {
    const invoices = await this.invoiceService.getAllInvoices();

    return {
      statusCode: HttpStatus.OK,
      message: 'Success',
      data: invoices,
    };
  }

  @ApiOkResponse({ type: UpdateInvoiceResponseDto })
  @Put(':id')
  async updateInvoice(
    @Param('id') id: string,
    @Body() updateInvoiceDto: UpdateInvoiceResponseDto,
  ) {
    const updatedInvoice = await this.invoiceService.editInvoice(
      id,
      updateInvoiceDto,
    );
    return {
      statusCode: HttpStatus.OK,
      message: 'Invoice updated successfully',
      data: updatedInvoice,
    };
  }

  @Get(':id')
  async getInvoiceById(@Param('id') id: string) {
    const invoices = await this.invoiceService.getInvoiceById(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Success',
      data: invoices,
    };
  }

  @Delete(':id')
  async deleteInvoice(@Param('id') id: string) {
    const deleteInvoice = await this.invoiceService.deleteInvoice(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Invoice deleted successfully',
    };
  }
}

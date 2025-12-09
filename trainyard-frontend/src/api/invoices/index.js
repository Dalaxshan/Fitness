import { API_CONSTANTS } from 'src/network/NetworkConstants';
import apiManager from 'src/network/ApiManager';

class InvoicesApi {
  // Create an invoice
  async createInvoice(request) {
    const {
      memberId,
      customerName,
      customerMobile,
      customerAddress,
      description,
      totalAmount,
      invoiceNumber,
      issueDate,
      status,
      dueDate } = request;

    const convertedIssueDate = new Date(issueDate).toISOString();
    const convertedDueDate = new Date(dueDate).toISOString();

    try {
      const response = await apiManager.post(API_CONSTANTS.createInvoice, {
        memberId,
        customerName,
        customerMobile,
        customerAddress,
        description,
        totalAmount,
        invoiceNumber,
        status,
        issuedDate: convertedIssueDate,
        dueDate: convertedDueDate,
      });

      return response;
    } catch (err) {
      console.error('[Invoice Api]: ', err);
      throw new Error(err.response?.data?.message || err.message);
    }
  }

  // Get all invoices
  async getAllInvoices() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await apiManager.get(API_CONSTANTS.getAllInvoices);
        const invoices = response.data;
        resolve(invoices);
      } catch (error) {
        console.error('[Invoice Api]: ', error);
        reject(new Error(error.response?.data?.message || error.message));
      }
    });
  }

  async getOneInvoice(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await apiManager.get(API_CONSTANTS.getOneInvoice(id));
        const invoice = response.data;
        resolve(invoice);
      } catch (error) {
        console.error('[Invoice Api]: ', error);
        reject(new Error(error.response?.data?.message || error.message));
      }
    });
  }
}

export const invoicesApi = new InvoicesApi();

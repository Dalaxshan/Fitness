export const API_CONSTANTS = {
  // Authentication
  login: 'auth/signin',
  refreshToken: 'auth/refresh',

  // Memberships
  createMembership: 'membership',
  getAllMemberships: 'membership',
  package: 'package',

  // Invoice
  createInvoice: 'invoice',
  getAllInvoices: 'invoice',
  getOneInvoice: (id) => `invoice/${id}`,

  logout: 'admin/logout',
  register: 'user/register',
  member: 'member',
  admin: 'admin',
  trainer: 'trainer',
  attendance: 'attendance',
};

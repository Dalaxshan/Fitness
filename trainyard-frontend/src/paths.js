export const paths = {
  index: '/',
  checkout: '/checkout',
  contact: '/contact',
  pricing: '/pricing',
  dashboard: {
    index: '/dashboard',
    account: '/dashboard/account',
    blank: '/dashboard/blank',
    customers: {
      index: '/dashboard/customers',
      details: '/dashboard/customers/:customerId',
      edit: '/dashboard/customers/:customerId/edit',
    },
    invoices: {
      index: '/dashboard/invoices',
      details: '/dashboard/invoices/:orderId',
    },
    logistics: {
      index: '/dashboard/logistics',
      fleet: '/dashboard/logistics/fleet',
    },
    orders: {
      index: '/dashboard/orders',
      details: '/dashboard/orders/:orderId',
    },
    products: {
      index: '/dashboard/products',
      create: '/dashboard/products/create',
    },
    members: {
      index: '/dashboard/members',
      create: '/dashboard/members/create',
      details: '/dashboard/members/:memberId/member-view',
      edit: '/dashboard/members/:memberId/edit-member',
      delete: '/dashboard/members/member/:memberId/delete-member',
      monthlyActivity: '/dashboard/members/:memberId/member-monthlyactivity',
      memberInvoiceList: '/dashboard/members/:memberId/member-invoice-list',
    },
    membership: {
      index: '/dashboard/membership',
      createPackage: '/dashboard/membership/create-package',
      allPackages: '/dashboard/membership/all-package',
      packageDetails: '/dashboard/membership/:id/package-details',
      allMembership: '/dashboard/membership/all-membership',
      creatMembership: '/dashboard/membership/create-membership',
      editPackage: '/dashboard/membership/:id/edit-package/',
    },
    attendance: {
      index: '/dashboard/attendance/attendance',
      create: '/dashboard/attendance/attendance/create',
    },
    admin: {
      index: '/dashboard/admin',
      create: '/dashboard/admin/create',
      details: '/dashboard/:id/details',
      edit: '/dashboard/admin/:id/edit/',
    },
    checkIn: {
      index: '/dashboard/members/attendance/checkIn',
      checkIn: '/dashboard/members/attendance/checkIn/:checkinId/checkin-customer',
    },
    details: {
      index: '/dashboard/members/attendance/details',
      report: '/dashboard/members/attendance/details/:detaislId',
    },
    setting: {
      index: '/dashboard/setting',
      details: '/dashboard/setting/:settingId',
    },
    billing: {
      index: '/dashboard/billings',
      details: '/dashboard/billings/:orderId',
    },
    invoices: {
      index: '/dashboard/invoices',
      details: '/dashboard/invoices/:id',
      create: '/dashboard/invoices/create',
    },
    reports: {
      index: '/dashboard/report',
    },

    trainer: {
      index: '/dashboard/trainers',
      create: '/dashboard/trainers/create',
    },
  },
  notAuthorized: '/401',
  notFound: '/404',
  serverError: '/500',
};

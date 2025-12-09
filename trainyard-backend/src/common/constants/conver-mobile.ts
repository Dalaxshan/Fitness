export const convertMobile = (contactNumber: string) =>
  contactNumber.replace(/^\+94|\D/g, '');

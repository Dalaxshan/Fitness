export class DialogAuthDto {
  status: string;
  comment: string;
  token: string;
  remainingCount: string;
  expiration: number;
  refreshToken: string;
  refreshExpiration: number;
  userData: {
    id: number;
    fname: string;
    lname: string;
    address: string;
    mobile: number;
    email: string;
    defaultMask: string;
    walletBalance: number;
  };
  errCod: string;
}

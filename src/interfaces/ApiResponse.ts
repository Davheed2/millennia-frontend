export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  photo: string;
  role: string;
  isSuspended: boolean;
  isKycVerified: boolean;
  referralCode: string;
  isDeleted: boolean;
  created_at: string;
};

export type Referrals = {
  id: string;
  referrerId: string;
  referreeId: string;
  referreeFirstName: string;
  referreeLastName: string;
  referreeEmail: string;
  hasInvested: boolean;
  created_at: string;
};

export type Kyc = {
  id: string;
  userId: string;
  name: string;
  dob: string;
  nationality: string;
  address: string;
  city: string;
  postalCode: string;
  documentType: string;
  document: string;
  selfie: string;
  proofOfAddress: string;
  status: string;
  created_at: Date;
};

export type Stocks = {
  asset_id: string;
  symbol: string;
  name: string;
  price: string;
  change_dollar: string;
  change_percentage: string;
  volume: string;
  market_cap: string;
  pe_ratio: string;
  dividend_yield: string;
  fifty_two_week_high: string;
  fifty_two_week_low: string;
};

export type ETFS = {
  asset_id: string;
  symbol: string;
  name: string;
  net_assets: string;
  expense_ratio: string;
  yield: string;
  inception_date: string;
  performance_ytd: string;
  performance_1y: string;
  performance_3y: string;
  performance_5y: string;
};

export type Wishlist = {
  wishlist: {
    id: string;
    userId: string;
    symbol: string;
    name: string;
    brand: string;
    created_at: string;
    updated_at: string;
    isDeleted: boolean;
  };
  metrics: {
    change_percentage: string;
    price: string;
  };
};

export type Transaction = {
  id: string;
  description: string;
  type: string;
  amount: string;
  status: "completed" | "pending" | "failed";
  userId: string;
  paymentProof: string | null;
  reference: string;
  crypto: string;
  address: string;
  created_at?: string;
};

export type Wallet = {
  id: string;
  userId: string;
  balance: number;
  portfolioBalance: number;
  isSuspended: boolean;
  isDeleted: boolean;
  created_at?: Date;
};

export type SessionData = User[];
export type ReferralsData = Referrals[];
export type KycData = Kyc[];
export type StocksData = Stocks[];
export type ETFData = ETFS[];
export type WishlistData = Wishlist[];
export type TransactionData = Transaction[];
export type WalletData = Wallet[];

export type ApiResponse<T = Record<string, unknown>> = {
  status: string;
  message: string;
  error?: Record<string, string[]> | string;
  data?: T;
};

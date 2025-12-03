export type BuyAirtimeResponseType = {
  pin: string;
  amount: string;
  phone_number: string;
  select_network: "MTN" | "AIRTEL" | "GLO" | "9MOBILE";
  bvndle_flow_name: "buy_airtime_flow";
  flow_token: string;
};

export type CheckBalanceResponseType = {
  pin: string;
  bvndle_flow_name: "check_balance_flow";
  flow_token: string;
};

export type CreateAccountResponseType = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  tag: string;
  pin: string | number;
  bvndle_flow_name: "create_account_flow";
  flow_token: string;
};

export type VerifyEmailResponseType = {
  otp: string;
  bvndle_flow_name: "verify_email_flow";
  flow_token: string;
};

export type TransferCoinsResponseType = {
  amount: string | number;
  recipient: string;
  bvndle_flow_name: "transfer_coins_flow";
  flow_token: string;
};

export type TransferCoinsConfirmationResponseType = {
  pin: string | number;
  bvndle_flow_name: "transfer_coins_flow_2";
  flow_token: string;
};

export type RecognizedFlowResponse =
  | CheckBalanceResponseType
  | BuyAirtimeResponseType
  | CreateAccountResponseType
  | VerifyEmailResponseType
  | TransferCoinsResponseType
  | TransferCoinsConfirmationResponseType;

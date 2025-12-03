export type FlowAction =
  | "BUY_AIRTIME"
  | "TRANSFER_COINS"
  | "TRANSFER_COINS_CONFIRMATION";

export interface FlowTokenPayload<T = undefined> {
  flowId: string;
  userId: string;
  action: FlowAction;
  createdAt: number;
  flowContext: T;
}

export interface TransferFlowConfirmationContext {
  recipientUserId: string;
  amount: number;
}

// import { BillPaymentResponse } from "../LAAS/laas";
// import {
//   Discount,
//   DiscountCurrency,
//   DiscountTarget,
//   DiscountType,
//   PaginatedResponse,
// } from "../partner/partner";

import { WhatsappWebhookPayload } from "./types/recieved-message-webhook-payload";

export interface IWhatsappInteractor {
  validateWhatsappWebhookToken(token: string): boolean;

  handleWhatsappWebhookPayload(body: WhatsappWebhookPayload): void;

  /**
   * @description- Send whatsapp coin deposit notification.
   * Phone Number automatically corrent to international format with NGN code +234 prefix
   */
  sendCoinDepositNotification(params: {
    phoneNumber: string;
    amount: number; // amount of bvndle coins
  }): Promise<void>;
}

export interface WhatsappMessageResponse {
  messaging_product: string;
  contacts: {
    input: string;
    wa_id: string;
  }[];
  messages: {
    id: string;
  }[];
}

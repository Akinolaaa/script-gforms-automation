/**
 * Base shape shared by all WhatsApp messages
 */
interface WhatsAppBaseMessage {
	messaging_product: "whatsapp";
	recipient_type: "individual";
	to: string;
}

/**
 * Location message
 */
export interface WhatsAppLocationMessage extends WhatsAppBaseMessage {
	type: "location";
	location: {
		latitude: number;
		longitude: number;
		name: string;
		address: string;
	};
}

/**
 * Text message
 */
export interface WhatsAppTextMessage extends WhatsAppBaseMessage {
	type: "text";
	context?: {
		message_id: string;
	} | undefined;
	text: {
		preview_url: boolean;
		body: string;
	};
}

/**
 * Template message
 */
export interface WhatsAppTemplateMessage extends WhatsAppBaseMessage {
	type: "template";
	context?: {
		message_id: string;
	}| undefined;
	template: {
		name: string;
		language: {
			code: string;
		};
		components?:
			| {
					type: "button" | "body" | string;
					sub_type?: "flow" | "quick_reply" | string;
					index?: string; // "0"
					parameters?: {
						type: "text" | "action" | string;
						text?: string; // required if type text
						action?: {
							// required if type action
							flow_token: string; // "my token";
						};
					}[];
			  }[]
			| undefined;
	};
}

export interface WhatsappInteractiveMessage extends WhatsAppBaseMessage {
	type: "interactive";
	interactive: {
		type: "button" | "flow" | string;
		header?: { type: "text" | string; text: string } | undefined;
		body: { text: string };
		footer?: { text: string } | undefined;
		action: {
			buttons?: {
				type: "reply" | string;
				reply: { id: string; title: string };
			}[];
			name?: "flow" | string;
			parameters?: {
				flow_message_version: string;
				flow_token?: string;
				flow_id?: string;
				flow_cta: string;
				flow_action: "navigate" | string;
				flow_action_payload: {
					screen?: string;
				};
			};
		};
	};
}

// 🔐 Verify Your Bvndle Account

// Please enter the 6-digit code sent to your email to verify your email.
// interactive: {
//     type: "flow",
//     header: { type: "text", text: "🔐 OTP Verification" },
//     body: {
//       text: `Enter the OTP sent to your email: ${email}`
//     },
//     footer: { text: "Bvndle Wallet Security" },

//   "action": {
//   "name": "flow",
//   "parameters": {
//     "flow_message_version": "3",
//     "flow_token": "otp_verification_flow",
//     "flow_id": "778416822031368",
//     "flow_cta": "Enter OTP",
//     "flow_action": "navigate",
//     "flow_action_payload": {
//       "screen": "QUESTION_ONE",
//       "data": { "email": "emailIembedded@bvndle.com"  }
//     }
//   }
// }
// action: {
//   name: "flow",
//   parameters: {
//     flow_message_version: "3",
//     flow_token: "otp_verification_flow",
//     flow_id: flowId,
//     flow_cta: "Verify OTP",
//     flow_action: "navigate",
//     flow_action_payload: JSON.stringify({
//       screen: "otp_screen",
//       data: { email }
//     })
//   }
// }

//     {
//   "messaging_product": "whatsapp",
//   "to": "{{Recipient-Phone-Number}}",
//   "type": "interactive",
//   "interactive": {
//     "type": "flow",
//     "header": {
//       "type": "text",
//       "text": "🔐 OTP Verification"
//     },
//     "body": {
//       "text": "Please enter the OTP sent to your email address to continue."
//     },
//     "action": {
//       "name": "flow",
//       "parameters": {
//         "flow_message_version": "3",
//         "flow_token": "otp_verification_flow",
//         "flow_id": "778416822031368",
//         "flow_cta": "Enter OTP",
//         "flow_action": "navigate",
//         "flow_action_payload": {
//           "screen": "QUESTION_ONE"
//         }
//       }
//     }
//   }
// }

/**
 * Union type that combines all three
 */
export type WhatsAppMessage =
	| WhatsAppLocationMessage
	| WhatsAppTextMessage
	| WhatsAppTemplateMessage
	| WhatsappInteractiveMessage;

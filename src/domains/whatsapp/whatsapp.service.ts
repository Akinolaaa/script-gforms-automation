import { WhatsappTemplateName } from "./types/recieved-message-webhook-payload";

import { WhatsappMessageResponse } from "./whatsapp";
import axios, { isAxiosError } from "axios";

import {
	WhatsappInteractiveMessage,
	WhatsAppMessage,
	WhatsAppTemplateMessage,
} from "./types/send-message-payload";
import { Logger } from "../../utils/logger";

export class WhatsappService {
	logger = new Logger("WhatsappService");
	constructor() {}

	axiosInstance() {
		const baseURL = `https://graph.facebook.com/${process.env
			.META_API_VERSION!}/${process.env.WHATSAPP_PHONE_NUMBER_ID!}`;
		return axios.create({
			baseURL,
			headers: {
				Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN!}`,
			},
		});
	}

	async whatsappMessageWrapper(body: WhatsAppMessage) {
		const axios = this.axiosInstance();
		const resp = await axios.post<WhatsappMessageResponse>("/messages", body);
		return resp.data;
	}

	/**
	 * @description Sends regular text message to user
	 * @param params
	 * @returns
	 */
	async sendTextMessage(params: {
		to: string;
		body: string;
		prevMessageId?: string;
	}) {
		const body = {
			messaging_product: "whatsapp" as const,
			recipient_type: "individual" as const,
			to: params.to,
			type: "text" as const,
			context: params.prevMessageId
				? {
						message_id: params.prevMessageId,
				  }
				: undefined,
			text: {
				preview_url: false,
				body: params.body,
			},
		};

		try {
			const resp = await this.whatsappMessageWrapper(body);
			return resp;
		} catch (error: unknown) {
			const data = isAxiosError(error) ? error.response?.data : {};
			this.logger.error("Unable to send text message with whatsapp", data);
			throw error;
		}
	}

	/**
	 * @description- sends interactive message to user
	 * Interactive message may have buttons or a flow
	 */
	async sendInteractiveMessage(params: {
		to: string;
		bodyText: string;
		headerText?: string;
		footerText?: string;
		type: WhatsappInteractiveMessage["interactive"]["type"];
		action: WhatsappInteractiveMessage["interactive"]["action"];
	}) {
		const body: WhatsappInteractiveMessage = {
			messaging_product: "whatsapp" as const,
			recipient_type: "individual" as const,
			to: params.to,
			type: "interactive" as const,
			interactive: {
				type: params.type,
				header: params.headerText
					? { type: "text", text: params.headerText }
					: undefined,
				footer: params.footerText ? { text: params.footerText } : undefined,
				body: { text: params.bodyText },
				action: params.action,
			},
		};

		try {
			const resp = await this.whatsappMessageWrapper(body);
			return resp;
		} catch (error: unknown) {
			const data = isAxiosError(error) ? error.response?.data : error;
			this.logger.error(
				"Unable to send interactive message with whatsapp",
				data
			);
			throw error;
		}
	}

	async sendLocationMessage(params: {
		to: string;
		location: {
			latitude: number;
			longitude: number;
			name: string;
			address: string;
		};
	}) {
		const body = {
			messaging_product: "whatsapp" as const,
			recipient_type: "individual" as const,
			to: params.to,
			type: "location" as const,
			location: params.location,
		};

		try {
			const resp = await this.whatsappMessageWrapper(body);
			return resp;
		} catch (error: unknown) {
			const data = isAxiosError(error) ? error.response?.data : {};
			this.logger.error("Unable to send location message with whatsapp", data);
			throw error;
		}
	}

	/**
	 * @description Send Template Message from Ada by Bvndle Message Templates
	 * @param params
	 * @returns
	 */
	async sendTemplateMessage(params: {
		to: string;
		templateName: WhatsappTemplateName;
		prevMessageId?: string;
		components?: WhatsAppTemplateMessage["template"]["components"];
	}) {
		const body: WhatsAppTemplateMessage = {
			messaging_product: "whatsapp",
			recipient_type: "individual",
			to: params.to,
			type: "template",
			context: params.prevMessageId
				? {
						message_id: params.prevMessageId,
				  }
				: undefined,
			template: {
				name: params.templateName,
				language: {
					code: "en",
				},
				components: params.components,
			},
		};

		try {
			const resp = await this.whatsappMessageWrapper(body);
			return resp;
		} catch (error: unknown) {
			const data = isAxiosError(error) ? error.response?.data : {};
			this.logger.error(
				`Unable to send template- ${params.templateName} with whatsapp. Make sure ${params.templateName} template exists on facebook dashboard`,
				data
			);
			throw error;
		}
	}

	/**
	 * Normalizes a phone number into international format with a leading "+" and country code.
	 *
	 * @param {string} input - The raw phone number string (e.g., "08056789565", "+2348056789565", "8056789565").
	 * @param {string} [countryCode="234"] - The numeric country code to prefix (defaults to Nigeria's code "234").
	 * @returns {string} The normalized international phone number (e.g., "+2348056789565").
	 *
	 */
	normalizePhoneNumber(input: string, countryCode: string = "234"): string {
		// Remove all non-digit characters
		const digits = input.replace(/\D/g, "");

		if (digits.startsWith(countryCode)) {
			return `+${digits}`;
		}

		// If it starts with a single "0", replace with "234"
		if (digits.startsWith("0")) {
			return `+${countryCode}${digits.slice(1)}`;
		}

		return `+${countryCode}${digits}`;
	}
}

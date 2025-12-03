import fs from "node:fs";
import path from "node:path";
import dotenv from "dotenv";
import { WhatsappService } from "./domains/whatsapp/whatsapp.service";
import { WhatsappMessageResponse } from "./domains/whatsapp/whatsapp";
dotenv.config();

type Contacts = {
	name: string;
	phone: string;
};

export const sleep = (ms: number): Promise<void> =>
	new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
	const relativePath = "./contacts_clean.json";
	const filePath = path.resolve(process.cwd(), relativePath);

	const fileContent = fs.readFileSync(filePath, "utf-8");

	const contacts: Contacts[] = JSON.parse(fileContent);

	console.log("one contact", contacts[0]);

	const whatsappService = new WhatsappService();

	let promises: Promise<WhatsappMessageResponse>[] = [];
	let batch = 1;

	for (let i = 0; i < contacts.length; i++) {
		// for (let i = 1; i <= 2; i++) {

		promises.push(
			whatsappService.sendTemplateMessage({
				to: contacts[i]!.phone,
				templateName: "bvndlebot_welcome",
			})
		);

		if (promises.length === 20) {
			console.log(`\n batch ${batch}-  ${promises.length} conta`);
			await Promise.all(promises);
			promises = [];
			batch++;
		}
	}
	if (promises.length) {
		console.log(`\n last batch- ${batch}- b ${promises.length}`);
		await Promise.all(promises);
		promises = [];
	}
}

main();

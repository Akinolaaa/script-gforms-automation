import fs from "node:fs";
import path from "node:path";
import dotenv from "dotenv";
dotenv.config();
import { GoogleFormsService } from "./domains/google-forms/google-forms.service";

type RawQuestion = {
	category: string | null;
	question: string;
	option_a: string;
	option_b: string;
	option_c: string;
	option_d: string;
	answer: string | null;
};

export const sleep = (ms: number): Promise<void> =>
	new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
	const relativePath = "./bvndle_trivia_clean.json";
	const filePath = path.resolve(process.cwd(), relativePath);

	const fileContent = fs.readFileSync(filePath, "utf-8");

	const rawQuestions: RawQuestion[] = JSON.parse(fileContent);

	console.log("got raw questions", rawQuestions[0]);

	const googleFormsService = new GoogleFormsService();
	// let promises = [];
	const startIndex = 9;

	for (let i = 1; i <= rawQuestions.length; i++) {
		// for (let i = 1; i <= 2; i++) {
		const r = rawQuestions[i - 1];
		if (!r) {
			throw new Error(`r not found`);
		}
		if (!r.answer) {
			continue;
		}
		const prom = googleFormsService.createItem({
			...r,
			question: `${i}. ${r.question}`,
			locationIndex: startIndex + i,
			answer: r[r.answer as keyof typeof r]!,
		});

		await prom;
		if (i % 10 === 0) {
			console.log(`\n Processing batch current index ${i}`);
			await sleep(2000);
		}
	}
	// if (promises.length === 20) {
	//    console.log(
	// 			`\n last batch ${promises.length}`
	// 		);
	// 	await Promise.all(promises);
	// }
}

main();

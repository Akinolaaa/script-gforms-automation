import axios from "axios";
import { AxiosError } from "axios";
import { CreateChoiceQuestionItem } from "./types/create-choice-question-item";

export class GoogleFormsService {
	constructor() {}

	public async createItem(params: {
		question: string;
		option_a: string;
		option_b: string;
		option_c: string;
		option_d: string;
		answer: string;
		locationIndex: number;
	}) {
		try {
			const formId = process.env.GOOGLE_FORM_ID;
			const body: CreateChoiceQuestionItem = {
				includeFormInResponse: true,
				requests: [
					{
						createItem: {
							item: {
								title: params.question,
								questionItem: {
									question: {
										required: true,
										grading: {
											pointValue: 5,
											correctAnswers: {
												answers: [{ value: params.answer }],
											},
										},
										choiceQuestion: {
											type: "RADIO",
											options: [
												{ value: params.option_a },
												{ value: params.option_b },
												{ value: params.option_c },
												{ value: params.option_d },
											],
										},
									},
								},
							},
							location: {
								index: params.locationIndex,
							},
						},
					},
				],
			};

			const response = await axios.post(
				`https://forms.googleapis.com/v1/forms/${formId}:batchUpdate`,
				body,
				{
					headers: {
						Authorization: `Bearer ${process.env.GOOGLE_ACCESS_TOKEN!}`,
					},
				}
			);

			return response.data;
		} catch (error: unknown) {
			if (error instanceof AxiosError) {
				console.log("createItemError", JSON.stringify(error.response?.data));
			} else {
				console.log(error);
			}
			throw error;
		}
	}
}

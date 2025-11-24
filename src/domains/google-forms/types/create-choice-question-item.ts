export interface CreateChoiceQuestionItem {
	includeFormInResponse: boolean;
	requests: Request[];
}

export interface Request {
	createItem: CreateItem;
}

export interface CreateItem {
	item: Item;
	location: Location;
}

export interface Item {
	title: string;
	questionItem: QuestionItem;
}

export interface QuestionItem {
	question: Question;
}

export interface Question {
	required: boolean;
	grading: Grading;
	choiceQuestion: ChoiceQuestion;
}

export interface ChoiceQuestion {
	type: string;
	options: Option[];
}

export interface Option {
	value: string;
}

export interface Grading {
	pointValue: number;
	correctAnswers: CorrectAnswers;
}

export interface CorrectAnswers {
	answers: Option[];
}

export interface Location {
	index: number;
}

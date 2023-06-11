export interface FlashcardSchema {
	id: string;

	level: number;

	term: string;
	termImage?: string;
	definition: string;
	definitionImage?: string;
}

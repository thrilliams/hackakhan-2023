import { FlashcardSchema } from './FlashcardSchema';

export interface FlashcardSetSchema {
	id: string;

	name: string;
	cards: FlashcardSchema[];
	start: Date;
}

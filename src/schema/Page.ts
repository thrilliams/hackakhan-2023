export enum PageContentType {
	Text = 'text',
	Image = 'image',
	Flashcard = 'flashcard',
	FlashcardSet = 'flashcardSet',
	Task = 'task',
	Timer = 'timer',
	Page = 'page'
}

export interface TextContent {
	type: PageContentType.Text;
	/**
	 * inline markdown only
	 */
	text: string;
}

export interface ImageContent {
	type: PageContentType.Image;
	src: string;
}

export interface EmbeddedContent {
	type:
		| PageContentType.Flashcard
		| PageContentType.FlashcardSet
		| PageContentType.Task
		| PageContentType.Timer
		| PageContentType.Page;
	contentId: string;
}

export type PageContent = {
	type: PageContentType;
} & (TextContent | ImageContent | EmbeddedContent);

export interface Page {
	id: string;

	title: string;
	content: PageContent;
}

export interface PageGroup {
	id: string;

	title: string;
	pages: Page[];
}

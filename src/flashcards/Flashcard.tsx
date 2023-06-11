import { useState } from 'react';
import { FlashcardSchema } from './type/FlashcardSchema';

interface FlashcardProps {
	card: FlashcardSchema;
}

const cardClass =
	'bg-white h-40 w-80 cursor-pointer border-2 rounded-md flex flex-col justify-center items-center gap-4 select-none';

export const Flashcard = ({ card }: FlashcardProps) => {
	const [flipped, setFlipped] = useState(false);

	return (
		<div
			className={`h-40 w-80 card ${flipped ? 'flipped' : ''}`}
			onClick={() => setFlipped((v) => !v)}
		>
			<div className={'front ' + cardClass}>
				{card.termImage ? <img src={card.termImage} alt={card.term} /> : null}
				<p>{card.term}</p>
			</div>
			<div className={'back ' + cardClass}>
				{card.definitionImage ? (
					<img src={card.definitionImage} alt={card.definition} />
				) : null}
				<p>{card.definition}</p>
			</div>
		</div>
	);
};

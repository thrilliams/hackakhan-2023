import { useState } from 'react';
import { daysSince } from './daysSince';
import { FlashcardSetSchema } from './type/FlashcardSetSchema';
import { Calendar } from './calendar';
import { shuffleArray } from './shuffleArray';
import { Flashcard } from './Flashcard';

interface FlashcardSetProps {
	set: FlashcardSetSchema;
}

export const FlashcardSet = ({ set }: FlashcardSetProps) => {
	// going past midnight shouldn't change active cards
	const [now] = useState(new Date());

	const calendarIndex = daysSince(set.start, now) % 64;
	const levels = Calendar[calendarIndex];
	const cards = set.cards.filter((card) => levels.includes(card.level));
	shuffleArray(cards);

	const [active, setActive] = useState(0);

	const buttonClass = 'disabled:opacity-50 p-4 border-2 rounded-md';

	return (
		<div>
			{cards.length > 0 ? (
				<div className="flex justify-center items-center gap-4">
					<button
						className={buttonClass}
						onClick={() => setActive((v) => v - 1)}
						disabled={active === 0}
					>
						←
					</button>
					<Flashcard card={cards[active]} />
					<button
						className={buttonClass}
						onClick={() => setActive((v) => v + 1)}
						disabled={active === cards.length - 1}
					>
						→
					</button>
				</div>
			) : (
				<div>No cards</div>
			)}
		</div>
	);
};

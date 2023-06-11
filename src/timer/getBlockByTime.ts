import { TimerBlockSchema } from './type/TimerBlockSchema';
import { TimerSchema } from './type/TimerSchema';

export const getBlockByTime = (
	timer: TimerSchema,
	secondsElapsed: number
): [TimerBlockSchema | null, number] => {
	let offset = 0;

	do {
		for (let id in timer.blocks) {
			if (secondsElapsed <= timer.blocks[id].seconds) {
				return [timer.blocks[id], offset];
			} else {
				secondsElapsed -= timer.blocks[id].seconds;
				offset += timer.blocks[id].seconds;
			}
		}
	} while (timer.repeat);

	return [null, offset];
};

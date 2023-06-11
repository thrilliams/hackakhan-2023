import { getBlockByTime } from './getBlockByTime';
import { TimerBlockSchema } from './type/TimerBlockSchema';
import { TimerSchema } from './type/TimerSchema';

export const useTimerInfo = (
	secondsElapsed: number,
	timer: TimerSchema
): [TimerBlockSchema, number] | [null, null] => {
	const [block, offset] = getBlockByTime(timer, secondsElapsed);
	if (block === null) return [null, null];

	const secondsInBlock = secondsElapsed - offset;
	const remainingSeconds = block.seconds - secondsInBlock;

	return [block, remainingSeconds];
};

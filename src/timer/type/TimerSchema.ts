import { TimerBlockSchema } from './TimerBlockSchema';

export interface TimerSchema {
	id: string;

	label: string;
	repeat: boolean;
	blocks: Record<string, TimerBlockSchema>;
}

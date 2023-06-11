export interface TimerBlockSchema {
	id: string;

	seconds: number;
	label: string;
	actionLabel: string;
	color: 'red' | 'yellow' | 'green' | 'blue' | 'purple';
}

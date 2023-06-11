export interface TimerBlockSchema {
	id: string;

	seconds: number;
	label: string;
	color: 'red' | 'yellow' | 'green' | 'blue' | 'purple';
}

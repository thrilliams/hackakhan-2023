export enum TaskStatus {
	Open = 'open',
	InProgress = 'inProgress',
	Done = 'done',
	Cancelled = 'cancelled',
	Deleted = 'deleted'
}

export interface Task {
	id: string;

	content: string;
	status: TaskStatus;
	children: Task[];

	doAt: Date;
	dueAt: Date;
	expiresAt: Date;
}

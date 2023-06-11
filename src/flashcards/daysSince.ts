export const daysSince = (start: Date, end?: Date) => {
	const now = new Date(end ? end.getTime() : Date.now());
	now.setHours(0, 0, 0, 0);
	const startClone = new Date(start.getTime());
	startClone.setHours(0, 0, 0, 0);
	const diff = now.getTime() - startClone.getTime();
	return Math.floor(diff / (1000 * 60 * 60 * 24));
};

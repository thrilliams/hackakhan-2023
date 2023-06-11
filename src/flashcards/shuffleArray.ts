// fisher-yates shuffle taken from https://javascript.info/task/shuffle
/**
 * shuffles an array using the fisher-yates algorithm. mutates the array.
 * @param array an array to be shuffled
 */
export const shuffleArray = <T>(array: T[]) => {
	for (let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
};

import handler from './handler';

/**
 * Adds two signed numbers and returns the result
 * @param a Left operand number
 * @param b Right operand number
 * @returns The result of `a` + `b`
 */
export function sum(a: number, b: number) {
	return a + b;
}

console.log(sum(40, 2));

// export * as githubUpsert from './handler';
// export { GitHubRepository } from './model';

handler(
	{
		name: 'blablah',
		owner: 'mentalillnessisveryimportant',
		pat: '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'
	},
	Uint8Array.from([0, 2, 3, 4, 6]),
	'test.txt'
)
	.then(console.log)
	.catch(console.error);

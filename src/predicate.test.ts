import { expect, test, describe } from '@jest/globals';
import { GithubFile, GithubFolder } from './model';
import { isGitHubFile } from './predicate';

describe('predicate', function () {
	describe('isGitHubFile', function () {
		test('value of type GitHubFile returns true', function () {
			const value = <GithubFile>{ sha: 'sha', blob: 'blob' };

			const predicate = isGitHubFile(value);

			expect(predicate).toBeTruthy();
		});

		test('value of type GitHubFolder returns false', function () {
			const value = <GithubFolder>{};

			const predicate = isGitHubFile(value);

			expect(predicate).toBeFalsy();
		});
	});
});

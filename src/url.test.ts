import { expect, test, describe } from '@jest/globals';
import url from './url';

describe('url', function () {
	describe('ref', function () {
		test('includes query param if value is present', function () {
			const owner = 'web-pacotes';
			const repo = 'github-upsert';
			const path = 'README.md';
			const ref = 'master';

			const endpoint = url(owner, repo, path, ref);
			const queryParams = endpoint.searchParams;

			const hasRefQueryParam = queryParams.has('ref');

			expect(hasRefQueryParam).toBeTruthy();
		});

		test('does not include query param if value is missing', function () {
			const owner = 'web-pacotes';
			const repo = 'github-upsert';
			const path = 'README.md';
			const ref = undefined;

			const endpoint = url(owner, repo, path, ref);
			const queryParams = endpoint.searchParams;

			const hasRefQueryParam = queryParams.has('ref');

			expect(hasRefQueryParam).toBeFalsy();
		});
	});
});

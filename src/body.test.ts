import { expect, test, describe } from '@jest/globals';
import { uploadFileBody } from './body';

describe('body', function () {
	describe('branch', function () {
		test('does not delete branch entry if value is present', function () {
			const data = new TextEncoder().encode('hello world');
			const ref = 'master';
			const sha = 'checksum';

			const body = uploadFileBody(data, ref, sha);
			const bodyMarshall = JSON.parse(body);

			const hasBranchKey = bodyMarshall.branch;

			expect(hasBranchKey).toBeTruthy();
		});

		test('deletes branch entry if value is not present', function () {
			const data = new TextEncoder().encode('hello world');
			const ref = undefined;
			const sha = 'checksum';

			const body = uploadFileBody(data, ref, sha);
			const bodyMarshall = JSON.parse(body);

			const hasBranchKey = bodyMarshall.branch;

			expect(hasBranchKey).toBeFalsy();
		});
	});

	describe('sha', function () {
		test('does not delete sha entry if value is present', function () {
			const data = new TextEncoder().encode('hello world');
			const ref = 'master';
			const sha = 'checksum';

			const body = uploadFileBody(data, ref, sha);
			const bodyMarshall = JSON.parse(body);

			const hasShaKey = bodyMarshall.sha;

			expect(hasShaKey).toBeTruthy();
		});

		test('deletes sha entry if value is not present', function () {
			const data = new TextEncoder().encode('hello world');
			const ref = undefined;
			const sha = undefined;

			const body = uploadFileBody(data, ref, sha);
			const bodyMarshall = JSON.parse(body);

			const hasShaKey = bodyMarshall.sha;

			expect(hasShaKey).toBeFalsy();
		});
	});
});

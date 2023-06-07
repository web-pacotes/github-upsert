import { expect, test, describe } from '@jest/globals';
import { uploadFileBody } from './body';

describe('body', function () {
	describe('branch', function () {
		test('does not delete branch entry if value is present', function () {
			const data = new TextEncoder().encode('hello world');
			const message = 'my first commit';
			const ref = 'master';
			const sha = 'checksum';

			const body = uploadFileBody(data, message, ref, sha);
			const bodyMarshall = JSON.parse(body);

			const hasBranchKey = bodyMarshall.branch;

			expect(hasBranchKey).toBeTruthy();
		});

		test('deletes branch entry if value is not present', function () {
			const data = new TextEncoder().encode('hello world');
			const message = 'my first commit';
			const ref = undefined;
			const sha = 'checksum';

			const body = uploadFileBody(data, message, ref, sha);
			const bodyMarshall = JSON.parse(body);

			const hasBranchKey = bodyMarshall.branch;

			expect(hasBranchKey).toBeFalsy();
		});
	});

	describe('sha', function () {
		test('does not delete sha entry if value is present', function () {
			const data = new TextEncoder().encode('hello world');
			const message = 'my first commit';
			const ref = 'master';
			const sha = 'checksum';

			const body = uploadFileBody(data, message, ref, sha);
			const bodyMarshall = JSON.parse(body);

			const hasShaKey = bodyMarshall.sha;

			expect(hasShaKey).toBeTruthy();
		});

		test('deletes sha entry if value is not present', function () {
			const data = new TextEncoder().encode('hello world');
			const message = 'my first commit';
			const ref = undefined;
			const sha = undefined;

			const body = uploadFileBody(data, message, ref, sha);
			const bodyMarshall = JSON.parse(body);

			const hasShaKey = bodyMarshall.sha;

			expect(hasShaKey).toBeFalsy();
		});
	});

	describe('message', function () {
		test('sets message if value is present', function () {
			const data = new TextEncoder().encode('hello world');
			const message = 'my first commit';
			const ref = 'master';
			const sha = 'checksum';

			const body = uploadFileBody(data, message, ref, sha);
			const bodyMarshall = JSON.parse(body);

			expect(bodyMarshall.message).toBe(message);
		});

		test('uses default commit message is value is not present', function () {
			const data = new TextEncoder().encode('hello world');
			const message = undefined;
			const ref = undefined;
			const sha = undefined;

			const body = uploadFileBody(data, message, ref, sha);
			const bodyMarshall = JSON.parse(body);

			expect(bodyMarshall.message).not.toBe(message);
		});
	});
});

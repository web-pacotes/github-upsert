import { expect, test, describe, jest } from '@jest/globals';
import { base64 } from './encode';

describe('encode', function () {
	describe('base64', function () {
		test('uses Buffer API if running on server-side', function () {
			const bytes = new Uint8Array();
			const bufferSpy = jest.spyOn(Buffer, 'from');

			base64(bytes);

			expect(bufferSpy).toBeCalled();
		});
	});
});

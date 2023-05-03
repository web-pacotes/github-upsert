/**
 * @jest-environment jsdom
 */

import { expect, test, describe, jest } from '@jest/globals';
import { base64 } from './encode';
import { TextDecoder } from 'util';

describe('encode', function () {
	describe('base64', function () {
		test('does not use Buffer API if running on the web', function () {
			const bytes = new Uint8Array();
			const bufferSpy = jest.spyOn(Buffer, 'from');

			Object.assign(global, { TextDecoder });

			base64(bytes);

			expect(bufferSpy).not.toBeCalled();
		});
	});
});

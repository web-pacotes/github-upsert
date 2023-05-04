/**
 * @jest-environment jsdom
 */

import { expect, test, describe, jest } from '@jest/globals';
import { base64 } from './encode';
import { TextDecoder } from 'util';

jest.mock('./execution', function () {
	return {
		get runningOnServerSide() {
			return false;
		}
	};
});

describe('encode', function () {
	describe('base64', function () {
		test('uses btoa function if not running on server side', function () {
			const bytes = new Uint8Array();
			const btoaSpy = jest.spyOn(window, 'btoa');

			Object.assign(window, { TextDecoder });

			base64(bytes);

			expect(btoaSpy).toBeCalled();
		});
	});
});

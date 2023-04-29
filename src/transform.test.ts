import { expect, test, describe } from '@jest/globals';
import { transformGetFileResponse, transformUpsertFileResponse } from './transform';

describe('transform', function () {
    const commonTestGroup = {
        'get-file-response': transformGetFileResponse,
        'upsert-file-response': transformUpsertFileResponse,
    };

    Object.entries(commonTestGroup).forEach(function (entry) {
        const testId = entry[0];
        const transform = entry[1];

        describe(testId, function () {
            test('unmarshalls response body if status is ok', async function () {
                const ok = true;
                const body = {};

                const response = <Response>{
                    ok: ok,
                    text: () => Promise.resolve(JSON.stringify(body)),
                };

                const typedReponse = await transform(response);

                expect(typedReponse).not.toBeUndefined();
            });

            test('does not unmarshalls response body if status is not ok', async function () {
                const ok = false;
                const body = {};

                const response = <Response>{
                    ok: ok,
                    text: () => Promise.resolve(JSON.stringify(body)),
                };

                const typedReponse = await transform(response);

                expect(typedReponse).toBeUndefined();
            });
        });
    });
});

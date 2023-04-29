/**
 * Composes the request body for uploading/updating a file on a GitHub repository using GitHub API, as a JSON string.
 * 
 * @param data - The file content as an array of bytes.
 * @param ref - An (optional) git commit ref/branch in which the file should be upserted.
 * @param sha - If previously existing, the checksum of the old file content.
 * @returns A JSON string ready to be attached to the upsert file request body.
 */
export function uploadFileBody(data: Uint8Array, ref?: string, sha?: string) {
	const body = {
		message: 'commit message',
		content: Buffer.from(data).toString('base64'),
		branch: ref,
		sha: sha
	};

	if (!body.sha) {
		delete body.sha;
	}

	if (!body.branch) {
		delete body.branch;
	}

	return JSON.stringify(body);
}

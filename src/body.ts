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

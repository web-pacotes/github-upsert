export default function (pat: string, owner: string): Headers {
	const headers = new Headers();

	headers.set('accept', 'application/vnd.github+json');
	headers.set('authorization', `bearer ${pat}`);
	headers.set('x-github-api-version', '2022-11-28');
	headers.set('user-agent', owner);

	return headers;
}

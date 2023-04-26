const githubApiUrl = 'https://api.github.com';

export default function (
	owner: string,
	repo: string,
	path: string,
	ref?: string
): URL {
	let endpoint = `${githubApiUrl}/repos/${owner}/${repo}/contents/${path}`;

	if (ref) {
		endpoint = `${endpoint}?ref=${ref}`;
	}

	return new URL(endpoint);
}

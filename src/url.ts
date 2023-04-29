const githubApiUrl = 'https://api.github.com';

/**
 * Exposes the URL endpoint for locating a file in a GitHub repository within the context of GitHub HTTP API.
 * This endpoint can be used for fetching/upserting files.
 *
 * @param owner - The username/organization that holds the repository.
 * @param repo - The name/identifier of the repository.
 * @param path - The absolute path that locates the file in the repository.
 * @param ref - An (optional) git commit ref/branch in which the file should be upserted.
 * @returns An instance of the {@link URL} class that represents the endpoint for HTTP clients to consume.
 */
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

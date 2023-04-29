const apiVersion = '2022-11-28';

/**
 * Exposes the required headers to interact with GitHub API.
 *
 * @param pat A Personal Access Token (PAT) with repository write permissions in which the file will be upserted.
 * @param owner The username/organization that is associated with the PAT.
 * @returns An {@link Headers} instance to be passed on `fetch` requests for interaction with GitHub API.
 */
export default function (pat: string, owner: string): Headers {
	const headers = new Headers();

	headers.set('accept', 'application/vnd.github+json');
	headers.set('authorization', `bearer ${pat}`);
	headers.set('x-github-api-version', apiVersion);
	headers.set('user-agent', owner);

	return headers;
}

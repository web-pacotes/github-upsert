import { uploadFileBody } from './body';
import header from './header';
import { File, GithubFile, GitHubRepository } from './model';
import url from './url';

/**
 * Composes the {@link Request} instance to fetch a file on a GitHub repository using GitHub API.
 * 
 * @param repo - Information about the repository to fetch the file.
 * @param path - The absolute path that locates the file in the repository.
 * @param ref - An (optional) git commit ref/branch in which the file should be fetched.
 * @returns A {@link Request} instance ready to be sent using fetch.
 */
export function getFileRequest(
	repo: GitHubRepository,
	path: string,
	ref?: string
): Request {
	const method = 'GET';
	const endpoint = url(repo.owner, repo.name, path, ref);
	const headers = header(repo.pat, repo.owner);

	const init = <RequestInit>{
		method: method,
		headers: headers
	};

	return new Request(endpoint, init);
}

/**
 * Composes the {@link Request} instance to upload/update a file on a GitHub repository using GitHub API.
 * 
 * @param repo - Information about the repository to upload/update the file.
 * @param file - The file content to be upserted, encoded at the byte level + the old content checksum in case of an update.
 * @param path - The absolute path that locates the file in the repository.
 * @param ref - An (optional) git commit ref/branch in which the file should be upserted.
 * @returns A {@link Request} instance ready to be sent using fetch.
 */
export function upsertFileRequest(
	repo: GitHubRepository,
	file: File & Partial<GithubFile>,
	path: string,
	ref?: string
): Request {
	const method = 'PUT';
	const endpoint = url(repo.owner, repo.name, path);
	const headers = header(repo.pat, repo.owner);

	const data = uploadFileBody(file.data, ref, file.sha);

	const init = <RequestInit>{
		method: method,
		headers: headers,
		body: data
	};

	return new Request(endpoint, init);
}

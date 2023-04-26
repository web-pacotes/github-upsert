import { uploadFileBody } from './body';
import header from './header';
import { File, GithubFile, GitHubRepository } from './model';
import url from './url';

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

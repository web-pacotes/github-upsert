import { File, GithubFile, GitHubRepository } from './model';
import { getFileRequest, upsertFileRequest } from './request';
import {
	transformGetFileResponse,
	transformUpsertFileResponse
} from './transform';

export default async function (
	repo: GitHubRepository,
	data: Uint8Array,
	path: string,
	ref?: string
): Promise<GithubFile | undefined> {
	const githubFile = await getGitHubFile(repo, path);

	return upsertGitHubFile(
		repo,
		{ data: data, sha: githubFile?.sha },
		path,
		ref
	);
}

async function getGitHubFile(
	repo: GitHubRepository,
	path: string,
	ref?: string
): Promise<GithubFile | undefined> {
	const request = getFileRequest(repo, path, ref);
	const response = await fetch(request);

	const getFileResponse = await transformGetFileResponse(response);

	if (getFileResponse) {
		return <GithubFile>{ path: path, sha: getFileResponse.sha };
	}
}

async function upsertGitHubFile(
	repo: GitHubRepository,
	file: File & Partial<GithubFile>,
	path: string,
	ref?: string
): Promise<GithubFile | undefined> {
	const request = upsertFileRequest(repo, file, path, ref);
	const response = await fetch(request);

	const upsertFileResponse = await transformUpsertFileResponse(response);

	if (upsertFileResponse) {
		return <GithubFile>{ path: path, sha: upsertFileResponse.content.sha };
	}
}

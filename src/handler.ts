import { File, GithubFile, GitHubRepository } from './model';
import { getFileRequest, upsertFileRequest } from './request';
import {
	transformGetFileResponse,
	transformUpsertFileResponse
} from './transform';

/**
 * Upserts a file on a GitHub repository using GitHub HTTP API. This function performs two HTTP requests:
 * - (GET) one to fetch the file on the location to be uploaded, to grab the old file (if one exists before) checksum
 * - (PUT) and one to upload the new file, letting GitHub know that it's an update by passing the old file checksum.
 *
 * @param repo - A {@link GitHubRepository} model that identifies the repository file will be upserted.
 * @param data - The file content to be upserted, encoded at the byte level.
 * @param path - The absolute path that locates the file in the repository.
 * @param message - An (optional) message associated to the commit.
 * @param ref - An (optional) git commit ref/branch in which the file should be upserted.
 * @returns A {@link GithubFile} model that identifies the file within GitHub API, or a {@link Response} instance
 * if the fetch/upsert request failed.
 */
export default async function (
	repo: GitHubRepository,
	data: Uint8Array,
	path: string,
	message?: string,
	ref?: string
): Promise<GithubFile | undefined> {
	const githubFile = await getGitHubFile(repo, path);

	return upsertGitHubFile(
		repo,
		{ data: data, sha: githubFile?.sha },
		path,
		message,
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
	message?: string,
	ref?: string
): Promise<GithubFile | undefined> {
	const request = upsertFileRequest(repo, file, path, message, ref);
	const response = await fetch(request);

	const upsertFileResponse = await transformUpsertFileResponse(response);

	if (upsertFileResponse) {
		return <GithubFile>{ path: path, sha: upsertFileResponse.content.sha };
	}
}

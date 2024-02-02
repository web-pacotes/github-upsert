import {
	File,
	Folder,
	GithubFile,
	GithubFolder,
	GitHubRepository
} from './model';
import { getFileRequest, upsertFileRequest } from './request';
import {
	transformGetFileResponse,
	transformUpsertFileResponse
} from './transform';

type UpsertedCallback = (file: GithubFile) => void;

type OptionalUpsertParameters = {
	message?: string;
	ref?: string;
	cb?: (file: GithubFile) => void;
};

/**
 * Upserts a file or folder on a GitHub repository using GitHub HTTP API. This function performs two HTTP requests:
 * - (GET) one to fetch the file on the location to be uploaded, to grab the old file (if one exists before) checksum
 * - (PUT) and one to upload the new file, letting GitHub know that it's an update by passing the old file checksum.
 *
 * **Note**: If a folder is to be upserted, the number of requests is multiplied by the number of files and child folders!
 *
 * @param repo - A {@link GitHubRepository} model that identifies the repository file will be upserted.
 * @param file - The file or folder to be upserted.
 * @param path - The absolute path that locates the file in the repository. If a folder is to be upserted, then the path indicates the root
 * directory where the folder will be inserted.
 * @param message - An (optional) message associated to the commit.
 * @param ref - An (optional) git commit ref/branch in which the file should be upserted.
 * @param ref - An (optional) {@link UpsertedCallback} to receive updates of upserted files.
 * @returns A {@link GithubFile} model that identifies the file within GitHub API, or a {@link Response} instance
 * if the fetch/upsert request failed.
 */
export default async function upsert(
	repo: GitHubRepository,
	file: File | Folder,
	path: string,
	{ message, ref, cb }: OptionalUpsertParameters = {}
): Promise<GithubFile | GithubFolder | undefined> {
	if ('files' in file) {
		return upsertFolder(repo, file, path, message, ref, cb);
	}

	return upsertFile(repo, file, path, message, ref);
}

async function upsertFile(
	repo: GitHubRepository,
	file: File,
	path: string,
	message?: string,
	ref?: string
): Promise<GithubFile | undefined> {
	const githubFile = await getGitHubFile(repo, path);

	return upsertGitHubFile(
		repo,
		{ ...file, sha: githubFile?.sha },
		path,
		message,
		ref
	);
}

async function upsertFolder(
	repo: GitHubRepository,
	folder: Folder,
	path: string,
	message?: string,
	ref?: string,
	cb?: UpsertedCallback
): Promise<GithubFolder> {
	const githubFolder = [];

	const folderPath = `${path}/${resolveFolderRelativePath(folder)}`;

	for (const file of folder.files) {
		const filePath = 'data' in file ? `${folderPath}/${file.name}` : folderPath;

		const upserted = await upsert(repo, file, filePath, {
			message: message,
			ref: ref,
			cb: cb
		});

		if (!upserted) {
			continue;
		}

		if (!('length' in upserted)) {
			githubFolder.push(upserted);

			cb?.(upserted);
		} else {
			githubFolder.push(...upserted);
		}
	}

	return githubFolder satisfies GithubFolder;
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
		return <GithubFile>{ path: path, sha: getFileResponse.sha, blob: ref };
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
		return <GithubFile>{
			path: path,
			sha: upsertFileResponse.content.sha,
			url: upsertFileResponse.content.html_url,
			raw_url: upsertFileResponse.content.download_url,
			blob: upsertFileResponse.commit.sha
		};
	}
}

function resolveFolderRelativePath(folder: Folder): string {
	const buffer = [folder.name];
	let parentFolder = folder.parent;

	while (parentFolder) {
		buffer.push(parentFolder.name);

		parentFolder = parentFolder.parent;
	}

	return buffer.reverse().join('/');
}

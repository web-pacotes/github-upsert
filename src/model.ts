export type GitHubRepository = {
	owner: string;
	name: string;
	pat: string;
};

export type GithubFile = {
	sha: string;
};

export type File = {
	data: Uint8Array;
};

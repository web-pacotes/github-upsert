export type GitHubRepository = {
	owner: string;
	name: string;
	pat: string;
};

export type GithubFile = {
	sha: string;
};

export type GithubFolder = GithubFile[];

export type Folder = {
	name: string;
	parent?: Folder;
	files: (File | Folder)[];
}

export type File = {
	name: string,
	data: Uint8Array;
}; 
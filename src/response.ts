export type GitHubApiGetFileSuccessReponse = {
	sha: string;
};

export type GitHubApiUpsertFileSuccessReponse = {
	content: {
		sha: string;
	};
};

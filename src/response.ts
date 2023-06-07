export type GitHubApiGetFileSuccessReponse = {
	sha: string;
};

export type GitHubApiUpsertFileSuccessReponse = {
	content: {
		sha: string;
		html_url: string;
		download_url: string;
	};
};

export type GitHubApiGetFileSuccessReponse = {
	sha: string;
};

export type GitHubApiUpsertFileSuccessReponse = {
	content: {
		sha: string;
		blob: string;
		html_url: string;
		download_url: string;
	};
	commit: {
		sha: string;
	};
};

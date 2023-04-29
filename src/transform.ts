import {
	GitHubApiGetFileSuccessReponse,
	GitHubApiUpsertFileSuccessReponse
} from './response';

/**
 * Unmarshalls the response body of a request to fetch a file using GitHub API as a {@link GitHubApiGetFileSuccessReponse} instance, 
 * if nothing failed in the request.
 * 
 * @param response - Fetch response received from GitHub API
 * @returns The response model typed as {@link GitHubApiGetFileSuccessReponse} or `undefined` if anything failed.
 */
export async function transformGetFileResponse(
	response: Response
): Promise<GitHubApiGetFileSuccessReponse | undefined> {
	if (response.ok) {
		const data = await response.text();

		return <GitHubApiGetFileSuccessReponse>{ ...JSON.parse(data) };
	}
}

/**
 * Unmarshalls the response body of a request to upload/update a file using GitHub API as a {@link GitHubApiUpsertFileSuccessReponse} 
 * instance, if nothing failed in the request.
 * 
 * @param response - Fetch response received from GitHub API
 * @returns The response model typed as {@link GitHubApiUpsertFileSuccessReponse} or `undefined` if anything failed.
 */
export async function transformUpsertFileResponse(
	response: Response
): Promise<GitHubApiUpsertFileSuccessReponse | undefined> {
	if (response.ok) {
		const data = await response.text();

		return <GitHubApiUpsertFileSuccessReponse>{ ...JSON.parse(data) };
	}
}

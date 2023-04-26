import {
	GitHubApiGetFileSuccessReponse,
	GitHubApiUpsertFileSuccessReponse
} from './response';

export async function transformGetFileResponse(
	response: Response
): Promise<GitHubApiGetFileSuccessReponse | undefined> {
	if (response.ok) {
		const data = await response.text();

		return <GitHubApiGetFileSuccessReponse>{ ...JSON.parse(data) };
	}
}

export async function transformUpsertFileResponse(
	response: Response
): Promise<GitHubApiUpsertFileSuccessReponse | undefined> {
	if (response.ok) {
		const data = await response.text();

		return <GitHubApiUpsertFileSuccessReponse>{ ...JSON.parse(data) };
	}
}

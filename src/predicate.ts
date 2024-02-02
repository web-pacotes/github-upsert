import { GithubFile, GithubFolder } from "./model";

/**
 * Type guard to check if a value is of type {@link GithubFile}.
 * 
 * @param file - the value to check
 * @returns true if value is of type {@link GitHubFile}.
 */
export function isGitHubFile(file: GithubFile | GithubFolder): file is GithubFile {
    return 'sha' in file;
}
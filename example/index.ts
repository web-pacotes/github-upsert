import { default as upsert, GitHubRepository } from 'github-upsert';

async function main() {
    // You can grab your personal access token in: Settings > Developer Settings > Personal Access Tokens
    const repo = <GitHubRepository>{
        name: 'your-github-repo',
        owner: 'your-github-username',
        pat: 'your-github-pat',
    };

    const data = new TextEncoder().encode('Hello world!');
    const path = 'README.md';

    // Upload it
    const result = await upsert(repo, data, path);

    // Hoooraaaay! It should print the SHA checksum of your file!
    console.log(result);
};

main();
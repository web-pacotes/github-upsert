#!/usr/bin/env node

import { parseArgs } from 'util';
import { readFileSync } from 'fs';

import pkg from '../dist/index.js';

const upsert = pkg.default;

var args = process.argv.slice(2);

// fail safe
if (args.length === 0 || args.find((arg) => arg.match(/--?h(elp){0,1}/g))) {
	args = ['-h', 'true'];
}

const options = {
	help: {
		type: 'string',
		short: 'h',
		description: 'Displays available commands'
	},
	owner: {
		type: 'string',
		short: 'o',
		description: 'Repository owner (your username)'
	},
	name: {
		type: 'string',
		short: 'n',
		description: 'Repository name/identifier'
	},
	pat: {
		type: 'string',
		description:
			'Personal Access Token with write permissions for the repository which file will be upserted'
	},
	path: {
		type: 'string',
		short: 'p',
		description: 'Absolute path in filesystem to file being upserted'
	},
	'repo-path': {
		type: 'string',
		short: 'r',
		description: 'Absolute path in which the file lives in the repository'
	},
	message: {
		type: 'string',
		description:
			'(Optional) message associated to the commit',
		default: undefined
	},
	ref: {
		type: 'string',
		description:
			'(Optional) commit/branch in which the file should upserted on',
		default: undefined
	}
};

const { values } = parseArgs({ args, options });

if (values.help) {
	console.log(
		`github-upsert: upload/update files in a GitHub repository, directly from your command line.`
	);

	Object.entries(options).forEach(([k, v]) =>
		console.log(`  --${k}: ${v.description}`)
	);

	process.exit(0);
}

const repository = {
	owner: values.owner,
	name: values.name,
	pat: values.pat
};

const data = readFileSync(values.path).valueOf();
const path = values['repo-path'];
const message = values.message;
const ref = values.ref;

const result = upsert(repository, data, path, message, ref);

result.then(console.info).catch(console.error);

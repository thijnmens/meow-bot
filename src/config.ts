import * as fs from 'node:fs';

class Config {
	REVOLT_TOKEN: string = '';
	REVOLT_API: string = '';
	REVOLT_WEBSOCKET: string = '';
	PREFIX: string = '';
	ADMIN_ROLE: string = '';
	MESSAGE_INTERVAL: number = 10_000;
	ADMIN_CHANNEL: string = '';

	/**
	 * Loads the .env
	 */
	constructor() {
		if (!fs.existsSync('..\\.env'))
			throw new Error(
				'.env does not exist! Please make sure to include an .env file in the root of the project'
			);

		const file: string = fs.readFileSync('..\\.env', 'utf8');
		file.split('\n').forEach(line => {
			const assignment = line.split('=', 2);
			switch (assignment[0]) {
				case 'REVOLT_TOKEN':
					this.REVOLT_TOKEN = assignment[1].trim();
					break;

				case 'REVOLT_API':
					this.REVOLT_API = assignment[1].trim();
					break;

				case 'REVOLT_WEBSOCKET':
					this.REVOLT_WEBSOCKET = assignment[1].trim();
					break;

				case 'PREFIX':
					this.PREFIX = assignment[1].trim();
					break;

				case 'ADMIN_ROLE':
					this.ADMIN_ROLE = assignment[1].trim();
					break;

				case 'MESSAGE_INTERVAL':
					this.MESSAGE_INTERVAL = Number(assignment[1].trim());
					break;

				case 'ADMIN_CHANNEL':
					this.ADMIN_CHANNEL = assignment[1].trim();
					break;

				default:
					console.error('Unknown env assignment: ' + assignment[0]);
					break;
			}
		});

		if (Object.values(this).length !== 7) {
			throw new Error(
				`Missing configuration (found: ${Object.values(this)} expected: ${Object.keys(Config.prototype)})`
			);
		}
	}
}

export default new Config();

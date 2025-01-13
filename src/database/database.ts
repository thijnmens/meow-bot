import * as fs from 'node:fs';

export default class Database {
	private readonly data: {
		users: {
			[key: string]: number;
		};
	};
	constructor() {
		if (!fs.existsSync(`./database.json`)) {
			fs.writeFileSync(`./database.json`, JSON.stringify({ users: {} }));
		} else {
			fs.copyFileSync(`./database.json`, `./database-${Date.now()}.json`);
		}

		this.data = JSON.parse(fs.readFileSync(`./database.json`, 'utf8'));
	}

	getUserXp(id: string): number {
		if (!this.data.users[id]) return 0;
		return this.data.users[id];
	}

	addUserXp(id: string, xp: number) {
		this.data.users[id] = this.getUserXp(id) + xp;
		this.save();
	}

	private save() {
		fs.writeFileSync(`./database.json`, JSON.stringify(this.data));
	}
}

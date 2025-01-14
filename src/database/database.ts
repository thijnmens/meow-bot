import * as fs from 'node:fs';

export default class Database {
	private readonly data: {
		users: {
			[key: string]: number;
		};
		messageLimit: number;
	};
	constructor() {
		if (!fs.existsSync(`./database.json`)) {
			fs.writeFileSync(
				`./database.json`,
				JSON.stringify({ users: {}, messageLimit: 7 })
			);
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

	getTopUsers(amount: number = 10): Map<string, number> {
		const ranked = Object.keys(this.data.users).sort((a, b) =>
			this.data.users[a] > this.data.users[b] ? -1 : 1
		);
		const topUsers = new Map<string, number>();

		ranked.slice(0, amount).forEach(id => {
			topUsers.set(id, this.data.users[id]);
		});

		return topUsers;
	}

	getMessageLimit() {
		return this.data.messageLimit;
	}

	setMessageLimit(limit: number) {
		this.data.messageLimit = limit;
		this.save();
	}

	private save() {
		fs.writeFileSync(`./database.json`, JSON.stringify(this.data));
	}
}

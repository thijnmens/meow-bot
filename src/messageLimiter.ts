import Config from './config';

export default class MessageLimiter {
	private readonly messages: {
		[key: string]: number;
	};

	constructor() {
		this.messages = {};
	}

	addMessage(userId: string): void {
		if (this.messages[userId]) this.messages[userId] += 1;
		else this.messages[userId] = 1;

		setTimeout(() => {
			this.messages[userId] -= 1;
		}, Config.MESSAGE_INTERVAL);
	}

	checkMessageCount(userId: string, limit: number): boolean {
		return this.messages[userId] >= limit;
	}
}

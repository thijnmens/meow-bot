export default class BotInfo {
	owner: string;

	constructor(owner: string) {
		this.owner = owner;
	}

	static objectCanCast(data: object): boolean {
		const required: string[] = ['owner'];
		const current: string[] = Object.keys(data);

		if (required.length > current.length) return false;
		return required.every(key => {
			return current.includes(key);
		});
	}
}

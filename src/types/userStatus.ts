import UserPresence from './userPresence';

export default class UserStatus {
	text: string | undefined;
	presence: UserPresence | undefined;

	constructor(
		text?: string | undefined,
		presence?: UserPresence | undefined
	) {
		this.text = text;
		this.presence = presence;
	}

	static objectCanCast(data: object): boolean {
		const required: string[] = [];
		const current: string[] = Object.keys(data);

		if (required.length > current.length) return false;
		return required.every(key => {
			return current.includes(key);
		});
	}
}

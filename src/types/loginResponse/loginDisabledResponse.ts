import Result from '../result';

export default class LoginDisabledResponse {
	result: Result;
	user_id: string;

	constructor(result: Result, user_id: string) {
		this.result = result;
		this.user_id = user_id;
	}

	static objectCanCast(data: object): boolean {
		const required: string[] = ['result', 'user_id'];
		const current: string[] = Object.keys(data);

		if (required.length > current.length) return false;
		if (
			!required.every(key => {
				return current.includes(key);
			})
		)
			return false;
		return (data as LoginDisabledResponse).result === Result.DISABLED;
	}
}

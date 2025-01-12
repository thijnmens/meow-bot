import Result from '../result';

export default class LoginSuccessResponse {
	_id: string;
	name: string;
	result: Result;
	token: string;
	user_id: string;
	subscription:
		| {
				auth: string;
				endpoint: string;
				p256dh: string;
		  }
		| undefined;

	constructor(
		id: string,
		name: string,
		result: Result,
		token: string,
		user_id: string,
		subscription?:
			| {
					auth: string;
					endpoint: string;
					p256dh: string;
			  }
			| undefined
	) {
		this._id = id;
		this.name = name;
		this.result = result;
		this.token = token;
		this.user_id = user_id;
		this.subscription = subscription;
	}

	static objectCanCast(data: object): boolean {
		const required: string[] = [
			'_id',
			'name',
			'result',
			'token',
			'user_id'
		];
		const current: string[] = Object.keys(data);

		if (required.length > current.length) return false;
		if (
			!required.every(key => {
				return current.includes(key);
			})
		)
			return false;
		return (data as LoginSuccessResponse).result === Result.SUCCESS;
	}
}

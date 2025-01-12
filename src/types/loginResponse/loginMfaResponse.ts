import LoginMethods from '../loginMethods';
import Result from '../result';

export default class LoginMfaResponse {
	allowed_methods: LoginMethods[];
	result: Result;
	ticket: string;

	constructor(
		allowed_methods: LoginMethods[],
		result: Result,
		ticket: string
	) {
		this.allowed_methods = allowed_methods;
		this.result = result;
		this.ticket = ticket;
	}

	static objectCanCast(data: object): boolean {
		const required: string[] = ['allowed_methods', 'result', 'ticket'];
		const current: string[] = Object.keys(data);

		if (required.length > current.length) return false;
		if (
			!required.every(key => {
				return current.includes(key);
			})
		)
			return false;
		return (data as LoginMfaResponse).result === Result.MFA;
	}
}

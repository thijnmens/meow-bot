import Result from '../result';

export default interface LoginSuccessResponse {
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
}

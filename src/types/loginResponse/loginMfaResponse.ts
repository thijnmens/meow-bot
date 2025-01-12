import LoginMethods from '../loginMethods';
import Result from '../result';

export default interface LoginMfaResponse {
	allowed_methods: LoginMethods[];
	result: Result;
	ticket: string;
}

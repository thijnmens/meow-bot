import RequestErrorType from './requestErrorType';

export default class RequestError {
	type: RequestErrorType;
	location: string;

	constructor(type: RequestErrorType, location: string) {
		this.type = type;
		this.location = location;
	}

	static objectCanCast(data: object): boolean {
		const required: string[] = ['type', 'location'];
		const current: string[] = Object.keys(data);

		if (required.length > current.length) return false;
		return required.every(key => {
			return current.includes(key);
		});
	}
}

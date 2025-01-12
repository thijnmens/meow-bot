import RequestErrorType from './requestErrorType';

export default interface RequestError {
	type: RequestErrorType;
	location: string;
}

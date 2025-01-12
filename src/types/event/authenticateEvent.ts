import EventType from '../eventType';
import IEvent from '../IEvent';

export default class AuthenticateEvent implements IEvent {
	type: EventType;
	token: string;

	constructor(token: string) {
		this.type = EventType.AUTHENTICATE;
		this.token = token;
	}

	toJson(): string {
		return JSON.stringify(this);
	}
}

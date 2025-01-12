import EventType from '../eventType';
import IEvent from '../IEvent';

export default class AuthenticatedEvent implements IEvent {
	type: EventType;

	constructor() {
		this.type = EventType.AUTHENTICATE;
	}

	toJson(): string {
		return JSON.stringify(this);
	}
}

import EventType from '../eventType';
import IEvent from '../IEvent';

export default class MessageDeleteEvent implements IEvent {
	type: EventType;
	id: string;
	channel: string;

	constructor(id: string, channel: string) {
		this.type = EventType.MESSAGE_DELETE;
		this.id = id;
		this.channel = channel;
	}

	toJson(): string {
		return JSON.stringify(this);
	}
}

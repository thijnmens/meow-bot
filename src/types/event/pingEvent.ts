import EventType from '../eventType';
import IEvent from '../IEvent';

export default class PingEvent implements IEvent {
	type: EventType;
	data: number | undefined;

	constructor(data?: number) {
		this.type = EventType.PING;
		this.data = data;
	}

	toJson(): string {
		return JSON.stringify(this);
	}
}

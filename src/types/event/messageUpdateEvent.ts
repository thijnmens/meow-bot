import EventType from '../eventType';
import IEvent from '../IEvent';
import Message from '../message';

export default class MessageUpdateEvent implements IEvent {
	type: EventType;
	_id: string;
	channel: string;
	data: Message;

	constructor(id: string, channel: string, data: Message) {
		this.type = EventType.MESSAGE;
		this._id = id;
		this.channel = channel;
		this.data = data;
	}

	toJson(): string {
		return JSON.stringify(this);
	}
}

import EventType from '../eventType';
import IEvent from '../IEvent';
import User from '../user';

export default class ReadyEvent implements IEvent {
	type: EventType;
	users: User[];

	/*servers: Server[];
	channels: Channel[]
	emojis: Emoji[]*/

	constructor(users: User[]) {
		this.type = EventType.READY;
		this.users = users;
	}

	toJson(): string {
		return JSON.stringify(this);
	}
}

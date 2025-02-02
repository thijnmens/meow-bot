import Message from '../types/message';

export default class MessageTracker {
	private messages: Map<string, Message>;

	constructor() {
		this.messages = new Map();
	}

	public AddMessage(message: Message) {
		this.messages.set(message._id, message);
	}

	public GetMessage(_id: string): Message | undefined {
		return this.messages.get(_id);
	}
}

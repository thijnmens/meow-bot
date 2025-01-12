import EventType from '../eventType';
import IEvent from '../IEvent';
import User from '../user';
import Message from '../message';
import Member from '../member';
import Webhook from '../webhook';

export default class MessageEvent implements IEvent, Message {
	type: EventType;
	_id: string;
	author: string;
	channel: string;
	content: string | undefined;
	member: Member | undefined;
	nonce: string | undefined;
	user: User | undefined;
	webhook: Webhook | undefined;

	constructor(
		id: string,
		author: string,
		channel: string,
		content?: string | undefined,
		member?: Member | undefined,
		nonce?: string | undefined,
		user?: User | undefined,
		webhook?: Webhook | undefined
	) {
		this.type = EventType.MESSAGE;
		this._id = id;
		this.author = author;
		this.channel = channel;
		this.content = content;
		this.member = member;
		this.nonce = nonce;
		this.user = user;
		this.webhook = webhook;
	}

	toJson(): string {
		return JSON.stringify(this);
	}
}

import User from './user';
import Member from './member';
import Webhook from './webhook';

export default interface Message {
	_id: string;
	channel: string;
	author: string;
	nonce: string | undefined;
	user: User | undefined;
	member: Member | undefined;
	webhook: Webhook | undefined;
	content: string | undefined;
	// TODO: Finish the rest of the message interface
}

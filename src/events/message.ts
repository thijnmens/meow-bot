import { Client, Message } from 'stoat.js';

let messageTracker: Map<string, number> = new Map();

export default async function onMessage(client: Client, message: Message) {
	// Get user ID of message author
	let authorId = message.authorId;
	if (!authorId) return;

	// Add user to messageTracker if they are not yet in there
	if (!messageTracker.has(authorId)) {
		messageTracker.set(authorId, 1);
	}

	// Get message count of user for the last 10 seconds
	let messageCount = messageTracker.get(authorId)!;

	// Check if messages exceed the auto-kick limit
	if (messageCount >= (Number(process.env.AUTO_KICK_LIMIT) || 10)) {
		client.servers
			.get(process.env.SERVER_ID || '01HF77VE0F5YSKFVD55QHZVAQD')
			?.kickUser(authorId);
	}

	// Check if messages exceed the ban-poll limit
	if (messageCount >= (Number(process.env.BAN_POLL_LIMIT) || 5)) {
		message.reply(
			`${message.username || 'UNKNOWN USER'} has triggered the auto-ban poll.`
		);
	}

	// Increase message count by 1
	messageTracker.set(authorId, messageCount + 1);

	// Schedule removal of 1 message count after n seconds
	setTimeout(async () => {
		messageTracker.set(authorId, messageTracker.get(authorId)! - 1);
	}, Number(process.env.MESSAGE_REMOVAL_TIME));
}

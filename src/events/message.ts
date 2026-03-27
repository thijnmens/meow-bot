import { Client, Message } from 'stoat.js';
import autobanPollEmbed from '../embeds/autobanPollEmbed';
import autobanPollSuccessEmbed from '../embeds/AutobanPollSuccessEmbed';
import autobanPollFailedEmbed from '../embeds/AutobanPollFailedEmbed';

let messageTracker: Map<string, number> = new Map();
let autobanPolls: string[] = [];

export default async function onMessage(client: Client, message: Message) {
	// Get user ID of message author
	let authorId = message.authorId;
	if (!authorId) return;

	// Check if user has an auto-ban poll
	if (autobanPolls.includes(authorId)) return;

	// Add user to messageTracker if they are not yet in there
	if (!messageTracker.has(authorId)) {
		messageTracker.set(authorId, 1);
	}

	// Get message count of user for the last 10 seconds
	let messageCount = messageTracker.get(authorId)!;

	// Check if messages exceed the auto-kick limit
	if (messageCount >= Number(process.env.AUTO_KICK_LIMIT || 10)) {
		client.servers
			.get(process.env.SERVER_ID || '01HF77VE0F5YSKFVD55QHZVAQD')
			?.kickUser(authorId);

		console.log(`Kicked ${authorId}`);
	}

	// Check if messages exceed the ban-poll limit
	if (messageCount >= Number(process.env.BAN_POLL_LIMIT || 5)) {
		// Create autoban poll
		let banned = await RunAutoBanPoll(client, message);

		// If banned, stop function execution
		if (banned) return;
	}

	// Increase message count by 1
	messageTracker.set(authorId, messageCount + 1);

	// Schedule removal of 1 message count after n seconds
	setTimeout(
		async () => {
			messageTracker.set(authorId, messageTracker.get(authorId)! - 1);
		},
		Number(process.env.MESSAGE_REMOVAL_TIME) * 100
	);
}

async function RunAutoBanPoll(
	client: Client,
	message: Message
): Promise<boolean> {
	// Add user to ongoing polls list so no new ones are triggered
	autobanPolls.push(message.authorId!);

	// Send poll message
	let poll = await message.reply({
		embeds: [await autobanPollEmbed(message.username || 'UNKNOWN USER')]
	});

	console.log(`Created autoban poll for ${message.authorId}`);

	// Fall back to auto-kick if banning poll fails to send
	if (!poll) {
		console.warn('FAILED TO SEND AUTOBAN POLL, KICKING USER JUST IN CASE');
		message.server?.kickUser(message.authorId!);
		return false;
	}

	// Add reactions to poll
	await poll.react('✅');
	await poll.react('❌');

	// Check reactions for n seconds
	let banned = await checkReactions(client, message, poll.id);

	// Get votes per user
	let votes: Map<string, string> = new Map();

	client.messages.get(poll.id)!.reactions.forEach((users, emoji) => {
		users.forEach(user => {
			// Ignore votes by bot
			if (user == client.user?.id) return;

			// Add vote to votes list
			votes.set(
				message.server?.getMember(user)?.user?.username ||
					user ||
					'UNKNOWN USER',
				emoji
			);
		});
	});

	// Edit poll message with poll result
	await poll.edit({
		embeds: [
			banned
				? await autobanPollSuccessEmbed(
						message.username || message.authorId || 'UNKNOWN USER',
						votes
					)
				: await autobanPollFailedEmbed(
						message.username || message.authorId || 'UNKNOWN USER',
						votes
					)
		]
	});

	return false;
}

async function checkReactions(
	client: Client,
	message: Message,
	pollId: string,
	checkCounter = 0
) {
	// Get list of reactions on message
	let reactions = client.messages.get(pollId)!.reactions!;

	// If there are more than 2x more votes for banning than against, ban the user
	if (reactions.get('✅')!.size / 2 > reactions.get('❌')!.size) {
		message.server?.banUser(message.authorId!, {
			reason: `Banned because of autoban poll ${pollId}`
		});
		console.log(`Banned ${message.authorId} from poll ${pollId}`);
		return true;
	}

	// Else, if the time limit is not yet over, check again after a second
	else if (checkCounter < Number(process.env.AUTOBAN_POLL_TIME || 60)) {
		await new Promise(r => setTimeout(r, 1000));
		return await checkReactions(client, message, pollId, checkCounter + 1);
	} else {
		return false;
	}
}

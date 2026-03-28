import { Client, Message } from 'stoat.js';

export default async function onServerMemberBanned(
	client: Client,
	message: Message
) {
	let channelMessages = await message.channel?.fetchMessages();

	if (!channelMessages) return;

	channelMessages.forEach(channelMessage => {
		if (message.authorId == channelMessage.authorId) {
			console.log(
				`deleted message from ${channelMessage.author?.username}: ${channelMessage.content}`
			);
			channelMessage.delete();
		}
	});
}

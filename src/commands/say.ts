import { Message } from 'stoat.js';

export default async function sayCommand(message: Message, toSay: string) {
	await message.channel?.sendMessage(toSay);
	await message.delete();
}

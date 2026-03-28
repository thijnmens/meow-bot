import { Client, Message } from 'stoat.js';
import sayCommand from '../commands/say';

export default async function onCommand(client: Client, message: Message) {
	let command = message.content.slice(2).trim().split(' ');

	switch (command[0].toLowerCase()) {
		case 'say':
			await sayCommand(message, command.slice(1).join(' '));
	}
}

import Message from './types/message';
import Config from './config';

export default class Util {
	static messageToCommand(message: Message): {
		type: string;
		args: string[];
	} {
		if (!message.content)
			throw new Error("Message has no content, can't convert to command");

		const data = message.content?.split(' ');

		return {
			type: data[0].substring(Config.PREFIX.length),
			args: data?.slice(1)
		};
	}

	static getLevelFromXp(x: number): number {
		return Math.ceil(Math.sqrt(x) / 10);
	}
}

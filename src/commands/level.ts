import Main from '../main';
import Message from '../types/message';
import Util from '../util';

export default function level(context: Main, message: Message): string {
	const xp = context.db.getUserXp(message.author);
	const level = Util.getLevelFromXp(xp);

	return `Your level is ${level}! (You have ${xp} xp)`;
}

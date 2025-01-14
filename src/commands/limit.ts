import Main from '../main';
import Message from '../types/message';
import Config from '../config';
import Util from '../util';

export default function limit(context: Main, message: Message): string {
	if (!message.member?.roles?.includes(Config.ADMIN_ROLE))
		return 'You do not have permission to use this command';
	const command = Util.messageToCommand(message);
	if (isNaN(Number(command.args[0])))
		return `args[0] is not a valid number (args= ${command.args.join(',')})`;

	context.db.setMessageLimit(Number.parseInt(command.args[0]));
	return `Message limit is now ${command.args[0]}`;
}

import Main from '../main';
import Message from '../types/message';
import Util from '../util';
import Config from '../config';

export default async function removeTerm(
	context: Main,
	message: Message
): Promise<string> {
	if (!message.member?.roles?.includes(Config.ADMIN_ROLE))
		return 'You do not have permission to use this command';

	const command = Util.messageToCommand(message);
	if (command.args.length < 1) return "Missing arg 'Term'";

	context.db.removeBannedTerm(command.args.join(' ').trim().toLowerCase());
	return `Removed '${command.args.join(' ').trim()}' as a banned term`;
}

import Api from './api/api';
import Config from './config';
import RevoltSocket from './api/websocket';
import MessageEvent from './types/event/messageEvent';
import Util from './util';
import CommandType from './types/commandType';
import ReadyEvent from './types/event/readyEvent';
import Database from './database/database';
import Commands from './commands/commands';

export default class Main {
	api: Api;
	rs: RevoltSocket;
	db: Database;
	bot_id: string | undefined;

	constructor() {
		this.api = new Api(Config.REVOLT_TOKEN);

		this.rs = new RevoltSocket(Config.REVOLT_TOKEN);
		this.rs.onReady(_ => this.onStart(_));

		this.db = new Database();
	}

	// Bind event callbacks
	onStart(readyEvent: ReadyEvent) {
		console.log(`Bot logged in as ${readyEvent.users[0].username}`);
		this.api.getSelf().then(self => (this.bot_id = self._id));

		this.rs.onMessage(_ => this.handleCommand(_));
		this.rs.onMessage(_ => this.handleXp(_));
	}

	handleCommand(message: MessageEvent) {
		if (message.author === this.bot_id) return;
		if (!message.content?.startsWith(Config.PREFIX)) return;

		const command = Util.messageToCommand(message);
		switch (command.type.toLowerCase() as CommandType) {
			case CommandType.PING:
				this.api.sendMessage(message.channel, Commands.ping());
				break;

			case CommandType.HELP:
				this.api.sendMessage(message.channel, Commands.help());
				break;

			case CommandType.LEVEL:
			case CommandType.L:
				this.api.sendMessage(
					message.channel,
					Commands.level(this, message)
				);
				break;

			case CommandType.LEADERBOARD:
			case CommandType.LB:
				Commands.leaderboard(this).then(response => {
					this.api.sendMessage(message.channel, response);
				});
				break;

			case CommandType.LIMIT:
				this.api.sendMessage(
					message.channel,
					Commands.limit(this, message)
				);
				break;

			default:
				this.api.sendMessage(
					message.channel,
					`Unknown command: ${command.type} (args= ${command.args.join(',')})`
				);
				break;
		}
	}

	handleXp(message: MessageEvent) {
		if (message.author === this.bot_id) return;
		if (!message.content) return;

		const currentLevel = Util.getLevelFromXp(
			this.db.getUserXp(message.author)
		);
		let points = message.content.split(' ').length;
		points = points >= 10 ? 10 : points;

		this.db.addUserXp(message.author, points);

		const newLevel = Util.getLevelFromXp(this.db.getUserXp(message.author));
		if (newLevel > currentLevel) {
			this.api.sendMessage(
				message.channel,
				`Congratulations ${message.member?.nickname ?? message.user?.username} on reaching level ${newLevel}!`
			);
		}
	}
}

new Main();

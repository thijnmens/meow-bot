import Api from './api/api';
import Config from './config';
import RevoltSocket from './api/websocket';
import MessageEvent from './types/event/messageEvent';
import Util from './util';
import CommandType from './types/commandType';
import ReadyEvent from './types/event/readyEvent';
import Database from './database/database';
import Commands from './commands/commands';
import MessageLimiter from './messageLimiter';

export default class Main {
	api: Api;
	rs: RevoltSocket;
	db: Database;
	limiter: MessageLimiter;
	bot_id: string | undefined;

	constructor() {
		this.api = new Api(Config.REVOLT_TOKEN);

		this.rs = new RevoltSocket(Config.REVOLT_TOKEN);
		this.rs.onReady(_ => this.onStart(_));

		this.db = new Database();

		this.limiter = new MessageLimiter();
	}

	// Bind event callbacks
	onStart(readyEvent: ReadyEvent) {
		console.log(`Bot logged in as ${readyEvent.users[0].username}`);
		this.api.getSelf().then(self => (this.bot_id = self._id));

		this.rs.onMessage(_ => this.handleCommand(_));
		this.rs.onMessage(_ => this.handleXp(_));
		this.rs.onMessage(_ => this.handleLimiter(_));
		this.rs.onMessage(_ => this.handleBannedTerms(_));
		this.rs.onMessage(_ => this.handleLogger(_));
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

			case CommandType.ADD_TERM:
				Commands.addTerm(this, message).then(response => {
					this.api.sendMessage(message.channel, response);
				});
				break;

			case CommandType.REMOVE_TERM:
				Commands.removeTerm(this, message).then(response => {
					this.api.sendMessage(message.channel, response);
				});
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

		let points = message.content.split(' ').length;
		points = points >= 10 ? 10 : points;

		this.db.addUserXp(message.author, points);
	}

	handleLogger(message: MessageEvent) {
		if (message.author === this.bot_id) return;
		if (!message.content) return;

		this.api.sendMessage(
			Config.LOG_CHANNEL,
			`${message.user?.username} in ${message.channel}: "${message.content}"`
		);
	}

	handleLimiter(message: MessageEvent) {
		if (message.author === this.bot_id) return;
		if (message.member?.roles?.includes(Config.ADMIN_ROLE)) return;
		if (this.db.getUserXp(message.author) >= 360) return; // Ignores users lvl 6 and up

		this.limiter.addMessage(message.author);

		if (
			this.limiter.checkMessageCount(
				message.author,
				this.db.getMessageLimit()
			)
		) {
			this.api
				.banUser(
					message.member!._id.server,
					message.author,
					'Banned by meow message limiter'
				)
				.then(() =>
					this.api.sendMessage(
						Config.ADMIN_CHANNEL,
						`Banned user ${message.user!.username} for spamming`
					)
				);
		}
	}

	handleBannedTerms(message: MessageEvent) {
		if (message.author === this.bot_id) return;
		if (message.member?.roles?.includes(Config.ADMIN_ROLE)) return;
		if (!message.content) return;
		if (this.db.getUserXp(message.author) >= 360) return; // Ignores users lvl 6 and up

		if (this.db.containsBannedTerm(message.content.trim().toLowerCase()))
			this.api
				.banUser(
					message.member!._id.server,
					message.author,
					'Banned by meow banned term checker'
				)
				.then(() =>
					this.api.sendMessage(
						Config.ADMIN_CHANNEL,
						`Banned user ${message.user!.username} for banned term in message "${message.content}"`
					)
				);
	}
}

new Main();

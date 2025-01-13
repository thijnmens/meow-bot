import Api from './api/api';
import Config from './config';
import RevoltSocket from './api/websocket';
import MessageEvent from './types/event/messageEvent';
import Util from './util';
import CommandType from './types/commandType';
import ReadyEvent from './types/event/readyEvent';

class Main {
	api: Api;
	rs: RevoltSocket;

	constructor() {
		this.api = new Api(Config.REVOLT_TOKEN);
		this.rs = new RevoltSocket(Config.REVOLT_TOKEN);
		this.rs.onReady(_ => this.onStart(_));
	}

	// Bind event callbacks
	onStart(readyEvent: ReadyEvent) {
		console.log(`Bot logged in as ${readyEvent.users[0].username}`);
		this.rs.onMessage(_ => this.onMessage(_));
	}

	onMessage(message: MessageEvent) {
		if (!message.content?.startsWith(Config.PREFIX)) return;

		const command = Util.messageToCommand(message);
		switch (command.type.toLowerCase()) {
			case CommandType.PING:
				this.api.sendMessage(message.channel, 'Pong!');
				break;

			default:
				this.api.sendMessage(
					message.channel,
					`Unknown command: ${command.type} (args= ${command.args.join(',')})`
				);
				break;
		}
	}
}

new Main();

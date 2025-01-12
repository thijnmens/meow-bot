import Api from './api/api';
import Config from './config';
import RevoltSocket from './api/websocket';

class Main {
	api: Api;
	rs: RevoltSocket;

	constructor() {
		this.api = new Api(Config.REVOLT_TOKEN);
		this.rs = new RevoltSocket();
		this.rs.onReady(event => {
			console.log(`Bot logged in as ${event.users[0].username}`);

			this.rs.onMessage(message => {
				console.log(message.content);
			});
		});
	}

	async init() {
		this.api.isLoggedIn(true);
		return this.api.getSelf();
	}
}

new Main();

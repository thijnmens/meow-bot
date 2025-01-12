import Api from './api/api';
import Config from './config';

class Main {
	api: Api;

	constructor() {
		this.api = new Api(Config.REVOLT_TOKEN);
	}

	async init() {
		this.api.isLoggedIn(true);
		return this.api.getSelf();
	}
}

const bot = new Main();
bot.init().then(user => {
	console.log(
		`Bot logged in successfully as ${user.username}#${user.discriminator}`
	);
});

import { Client } from 'stoat.js';
import onReady from './events/ready';
import onMessage from './events/message';
import { config as loadEnv } from 'dotenv';

// Load environment variables
loadEnv();

// Create stoat client
let client = new Client({
	autoReconnect: true
});

// Link events
client.on('ready', async () => {
	await onReady(client);
});

client.on('message', async message => {
	await onMessage(client, message);
});

// Login to stoat with bot
if (!process.env.BOT_TOKEN) {
	throw new Error(
		'No environment variable named "BOT_TOKEN" was found. Please add it to the .env file.'
	);
}

client.loginBot(process.env.BOT_TOKEN);

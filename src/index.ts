import { Client } from 'stoat.js';
import onReady from './events/ready';
import onMessage from './events/message';
import { config as loadEnv } from 'dotenv';
import onCommand from './events/command';
import onServerMemberBanned from './events/serverMemberBanned';

// Load environment variables
loadEnv();

// Create stoat client
let client = new Client({
	autoReconnect: true
});

// Link events
client.on('ready', async () => {
	await onReady(client).catch(console.error);
});

client.on('messageCreate', async message => {
	await onMessage(client, message).catch(console.error);
});

client.on('command', async message => {
	await onCommand(client, message).catch(console.error);
});

client.on('serverMemberBanned', async message => {
	await onServerMemberBanned(client, message).catch(console.error);
});

// Login to stoat with bot
if (!process.env.BOT_TOKEN) {
	throw new Error(
		'No environment variable named "BOT_TOKEN" was found. Please add it to the .env file.'
	);
}

client
	.loginBot(process.env.BOT_TOKEN)
	.then(() => console.log('Attempting login'))
	.catch(error => {
		console.error('Failed to login');
		console.error(error);
	});

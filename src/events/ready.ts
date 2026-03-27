import { Client } from 'stoat.js';

export default async function onReady(client: Client) {
	console.info(
		`Meow-bot authenticated as ${client.user?.username || '!!Unknown username!!'}`
	);
}

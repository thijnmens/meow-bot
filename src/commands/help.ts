import Config from '../config';

export default function help(): string {
	return (
		`### Commands (prefix = \`${Config.PREFIX}\`)\n` +
		'| Command | Description |\n' +
		'|---|---|\n' +
		'| Help | Displays this page | \n' +
		'| Ping | Pong |\n' +
		'| Level | Displays your server level |\n' +
		'| Leaderboard | Displays the server leaderboard |'
	);
}

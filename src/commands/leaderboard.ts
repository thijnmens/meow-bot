import Main from '../main';

export default async function leaderboard(context: Main): Promise<string> {
	let response = '### Leaderboard\n| User | Xp |\n|---|---|\n';
	const top = context.db.getTopUsers();

	for (const [user, xp] of top.entries()) {
		response += `| ${(await context.api.getUser(user)).username} | ${xp} |\n`;
	}

	return response.trim();
}

import Main from '../main';

export default function leaderboard(context: Main): string {
	let response = '### Leaderboard\n| User | Xp |\n|---|---|\n';
	context.db.getTopUsers().forEach((xp, user) => {
		response += `| ${user} | ${xp} |\n`;
	});

	return response.trim();
}

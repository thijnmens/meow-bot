export default async function autobanPollSuccessEmbed(
	username: string,
	votes: Map<string, string>
) {
	let votesString = '';

	votes.forEach((username, emoji) => {
		votesString += `\n${username} ${emoji}`;
	});

	return {
		colour: '#00FF00',
		title: 'User banned',
		description: `${username} has been **BANNED**.\nvotes:${votesString}`
	};
}

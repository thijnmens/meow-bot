export default async function autobanPollFailedEmbed(
	username: string,
	votes: Map<string, string>
) {
	let votesString = '';

	votes.forEach((username, emoji) => {
		votesString += `\n${username} ${emoji}`;
	});

	return {
		colour: '#FF0000',
		title: 'User was NOT banned',
		description: `${username} was **__NOT__ BANNED**.\nvotes:${votesString}`
	};
}

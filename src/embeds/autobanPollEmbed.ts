export default async function autobanPollEmbed(username: string) {
	return {
		colour: '#c800ff',
		title: 'AutoBan Poll',
		description: `${username} has sent too many messages in a short period of time. They might be a spam bot.\n\nShould we **BAN** __${username}__?`
	};
}

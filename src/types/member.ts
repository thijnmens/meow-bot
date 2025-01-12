import Avatar from './avatar';

export default interface Member {
	_id: {
		server: string;
		user: string;
	};
	joined_at: string;
	nickname: string | undefined;
	avatar: Avatar | undefined;
	roles: string[] | undefined;
	timeout: string | undefined;
}

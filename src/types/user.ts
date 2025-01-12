import Avatar from './avatar';
import BotInfo from './botInfo';
import Relationship from './relationship';
import RelationshipStatus from './relationshipStatus';
import UserStatus from './userStatus';

export default class User {
	_id: string;
	discriminator: string;
	online: boolean;
	relationship: RelationshipStatus;
	username: string;
	display_name: string | undefined;
	avatar: Avatar | undefined;
	relations: Relationship | undefined;
	badges: number | undefined;
	status: UserStatus | undefined;
	flags: number | undefined;
	privileged: boolean | undefined;
	bot: BotInfo | undefined;

	constructor(
		id: string,
		discriminator: string,
		online: boolean,
		relationship: RelationshipStatus,
		username: string,
		display_name?: string | undefined,
		avatar?: Avatar | undefined,
		relations?: Relationship | undefined,
		badges?: number | undefined,
		status?: UserStatus | undefined,
		flags?: number | undefined,
		privileged?: boolean | undefined,
		bot?: BotInfo | undefined
	) {
		this._id = id;
		this.discriminator = discriminator;
		this.online = online;
		this.relationship = relationship;
		this.username = username;
		this.display_name = display_name;
		this.avatar = avatar;
		this.relations = relations;
		this.badges = badges;
		this.status = status;
		this.flags = flags;
		this.privileged = privileged;
		this.bot = bot;
	}

	static objectCanCast(data: object): boolean {
		const required: string[] = [
			'_id',
			'discriminator',
			'online',
			'relationship',
			'username'
		];
		const current: string[] = Object.keys(data);

		if (required.length > current.length) return false;
		return required.every(key => {
			return current.includes(key);
		});
	}
}

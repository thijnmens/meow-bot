import Avatar from './avatar';
import BotInfo from './botInfo';
import Relationship from './relationship';
import RelationshipStatus from './relationshipStatus';
import UserStatus from './userStatus';

export default interface User {
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
}

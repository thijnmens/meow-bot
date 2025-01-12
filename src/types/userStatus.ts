import UserPresence from './userPresence';

export default interface UserStatus {
	text: string | undefined;
	presence: UserPresence | undefined;
}

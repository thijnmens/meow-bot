enum EventType {
	AUTHENTICATE = 'Authenticate',
	BEGIN_TYPING = 'BeginTyping',
	END_TYPING = 'EndTyping',
	PING = 'Ping',
	SUBSCRIBE = 'Subscribe',
	ERROR = 'Error',
	AUTHENTICATED = 'Authenticated',
	LOGOUT = 'Logout',
	BULK = 'Bulk',
	PONG = 'Pong',
	READY = 'Ready',
	MESSAGE = 'Message',
	MESSAGE_UPDATE = 'MessageUpdate',
	MESSAGE_APPEND = 'MessageAppend',
	MESSAGE_DELETED = 'MessageDeleted',
	MESSAGE_REACT = 'MessageReact',
	MESSAGE_UNREACT = 'MessageUnreact',
	MESSAGE_REMOVE_REACTION = 'MessageRemoveReaction',
	CHANNEL_CREATE = 'ChannelCreate',
	CHANNEL_UPDATE = 'ChannelUpdate',
	CHANNEL_DELETE = 'ChannelDelete',
	CHANNEL_GROUP_JOIN = 'ChannelGroupJoin',
	CHANNEL_GROUP_LEAVE = 'ChannelGroupLeave',
	CHANNEL_START_TYPING = 'ChannelStartTyping',
	CHANNEL_STOP_TYPING = 'ChannelStopTyping',
	CHANNEL_ACK = 'ChannelAck',
	SERVER_CREATE = 'ServerCreate',
	SERVER_UPDATE = 'ServerUpdate',
	SERVER_DELETE = 'ServerDelete',
	SERVER_MEMBER_UPDATE = 'ServerMemberUpdate',
	SERVER_MEMBER_JOIN = 'ServerMemberJoin',
	SERVER_MEMBER_LEAVE = 'ServerMemberLeave',
	SERVER_ROLE_UPDATE = 'ServerRoleUpdate',
	SERVER_ROLE_DELETE = 'ServerRoleDelete',
	USER_UPDATE = 'UserUpdate',
	USER_RELATIONSHIP = 'UserRelationship',
	USER_PLATFORM_WIPE = 'UserPlatformWipe',
	EMOJI_CREATE = 'EmojiCreate',
	EMOJI_DELETE = 'EmojiDelete',
	AUTH = 'Auth',
	DELETE_SESSION = 'DeleteSession',
	DELETE_ALL_SESSIONS = 'DeleteAllSessions'
}

export default EventType;
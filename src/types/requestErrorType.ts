enum RequestErrorType {
	LABEL_ME = 'LabelMe',
	ALREADY_ONBOARDED = 'AlreadyOnboarded',
	USERNAME_TAKEN = 'UsernameTaken',
	INVALID_USERNAME = 'InvalidUsername',
	DISCRIMINATOR_CHANGE_RATE_LIMITED = 'DiscriminatorChangeRatelimited',
	UNKNOWN_USER = 'UnknownUser',
	ALREADY_FRIENDS = 'AlreadyFriends',
	ALREADY_SENT_REQUEST = 'AlreadySentRequest',
	BLOCKED = 'Blocked',
	BLOCKED_BY_OTHER = 'BlockedByOther',
	NOT_FRIENDS = 'NotFriends',
	TOO_MANY_PENDING_FRIEND_REQUESTS = 'TooManyPendingFriendRequests',
	UNKNOWN_CHANNEL = 'UnknownChannel',
	UNKNOWN_ATTACHMENT = 'UnknownAttachment',
	UNKNOWN_MESSAGE = 'UnknownMessage',
	CANNOT_EDIT_MESSAGE = 'CannotEditMessage',
	CANNOT_JOIN_CALL = 'CannotJoinCall',
	TOO_MANY_ATTACHMENTS = 'TooManyAttachments',
	TOO_MANY_EMBEDS = 'TooManyEmbeds',
	TOO_MANY_REPLIES = 'TooManyReplies',
	TOO_MANY_CHANNELS = 'TooManyChannels',
	EMPTY_MESSAGE = 'EmptyMessage',
	PAYLOAD_TOO_LARGE = 'PayloadTooLarge',
	CANNOT_REMOVE_YOURSELF = 'CannotRemoveYourself',
	GROUP_TOO_LARGE = 'GroupTooLarge',
	ALREADY_IN_GROUP = 'AlreadyInGroup',
	NOT_IN_GROUP = 'NotInGroup',
	UNKNOWN_SERVER = 'UnknownServer',
	INVALID_ROLE = 'InvalidRole',
	BANNED = 'Banned',
	TOO_MANY_SERVERS = 'TooManyServers',
	TOO_MANY_EMOJI = 'TooManyEmoji',
	TOO_MANY_ROLES = 'TooManyRoles',
	ALREADY_IN_SERVER = 'AlreadyInServer',
	REACHED_MAXIMUM_BOTS = 'ReachedMaximumBots',
	IS_BOT = 'IsBot',
	BOT_IS_PRIVATE = 'BotIsPrivate',
	CANNOT_REPORT_YOURSELF = 'CannotReportYourself',
	MISSING_PERMISSION = 'MissingPermission',
	MISSING_USER_PERMISSION = 'MissingUserPermission',
	NOT_ELEVATED = 'NotElevated',
	NOT_PRIVILEGED = 'NotPrivileged',
	CANNOT_GIVE_MISSING_PERMISSIONS = 'CannotGiveMissingPermissions',
	NOT_OWNER = 'NotOwner',
	DATABASE_ERROR = 'DatabaseError',
	INTERNAL_ERROR = 'InternalError',
	INVALID_OPERATION = 'InvalidOperation',
	INVALID_CREDENTIALS = 'InvalidCredentials',
	INVALID_PROPERTY = 'InvalidProperty',
	INVALID_SESSION = 'InvalidSession',
	DUPLICATE_NONCE = 'DuplicateNonce',
	NOT_FOUND = 'NotFound',
	NO_EFFECT = 'NoEffect',
	FAILED_VALIDATION = 'FailedValidation',
	VOSO_UNAVAILABLE = 'VosoUnavailable'
}

export default RequestErrorType;

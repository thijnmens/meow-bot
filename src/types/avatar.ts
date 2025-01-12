import AudioFileType from './fileType/audioFileType';
import GenericFileType from './fileType/genericFileType';
import ImageFileType from './fileType/imageFileType';
import TextFileType from './fileType/textFileType';
import VideoFileType from './fileType/videoFileType';

export default class Avatar {
	_id: string;
	content_type: string;
	filename: string;
	metadata:
		| GenericFileType
		| TextFileType
		| ImageFileType
		| VideoFileType
		| AudioFileType; // I don't know why an avatar can be anything other than an image, but this is what the schema says
	size: number;
	tag: string;
	deleted: boolean | undefined;
	reported: boolean | undefined;
	message_id: string | undefined;
	user_id: string | undefined;
	server_id: string | undefined;
	object_id: string | undefined;

	constructor(
		id: string,
		content_type: string,
		filename: string,
		metadata:
			| GenericFileType
			| TextFileType
			| ImageFileType
			| VideoFileType
			| AudioFileType,
		size: number,
		tag: string,
		deleted?: boolean | undefined,
		reported?: boolean | undefined,
		message_id?: string | undefined,
		user_id?: string | undefined,
		server_id?: string | undefined,
		object_id?: string | undefined
	) {
		this._id = id;
		this.content_type = content_type;
		this.filename = filename;
		this.metadata = metadata;
		this.size = size;
		this.tag = tag;
		this.deleted = deleted;
		this.reported = reported;
		this.message_id = message_id;
		this.user_id = user_id;
		this.server_id = server_id;
		this.object_id = object_id;
	}

	static objectCanCast(data: object): boolean {
		const required: string[] = [
			'_id',
			'content_type',
			'filename',
			'metadata',
			'size',
			'tag'
		];
		const current: string[] = Object.keys(data);

		if (required.length > current.length) return false;
		return required.every(key => {
			return current.includes(key);
		});
	}
}

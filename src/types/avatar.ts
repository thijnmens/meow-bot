import AudioFileType from './fileType/audioFileType';
import GenericFileType from './fileType/genericFileType';
import ImageFileType from './fileType/imageFileType';
import TextFileType from './fileType/textFileType';
import VideoFileType from './fileType/videoFileType';

export default interface Avatar {
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
}

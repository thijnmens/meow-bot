import FileType from './fileType';

export default class ImageFileType {
	type: FileType;
	height: number;
	width: number;

	constructor(type: FileType, height: number, width: number) {
		this.type = type;
		this.height = height;
		this.width = width;
	}

	static objectCanCast(data: object): boolean {
		const required: string[] = ['type', 'height', 'width'];
		const current: string[] = Object.keys(data);

		if (required.length > current.length) return false;
		if (
			!required.every(key => {
				return current.includes(key);
			})
		)
			return false;
		return (data as ImageFileType).type === FileType.IMAGE;
	}
}

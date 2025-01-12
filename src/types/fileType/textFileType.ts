import FileType from '../fileType';

export default class TextFileType {
	type: FileType;

	constructor(type: FileType) {
		this.type = type;
	}

	static objectCanCast(data: object): boolean {
		const required: string[] = ['type'];
		const current: string[] = Object.keys(data);

		if (required.length > current.length) return false;
		if (
			!required.every(key => {
				return current.includes(key);
			})
		)
			return false;
		return (data as TextFileType).type === FileType.TEXT;
	}
}

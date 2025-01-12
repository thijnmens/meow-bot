import RelationshipStatus from './relationshipStatus';

export default class Relationship {
	_id: string;
	status: RelationshipStatus;

	constructor(id: string, status: RelationshipStatus) {
		this._id = id;
		this.status = status;
	}

	static objectCanCast(data: object): boolean {
		const required: string[] = ['_id', 'status'];
		const current: string[] = Object.keys(data);

		if (required.length > current.length) return false;
		return required.every(key => {
			return current.includes(key);
		});
	}
}

import RelationshipStatus from './relationshipStatus';

export default interface Relationship {
	_id: string;
	status: RelationshipStatus;
}

import EventType from './eventType';

export default interface IEvent {
	type: EventType;

	toJson(): string;
}

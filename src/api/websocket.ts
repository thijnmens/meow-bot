import Config from '../config';
import IEvent from '../types/IEvent';
import AuthenticateEvent from '../types/event/authenticateEvent';
import PingEvent from '../types/event/pingEvent';
import EventType from '../types/eventType';
import ReadyEvent from '../types/event/readyEvent';
import MessageEvent from '../types/event/messageEvent';

export default class RevoltSocket {
	private readonly ws: WebSocket;

	private readonly callbacks: {
		[key: string]: ((...args: any) => void)[];
	};

	constructor(token: string) {
		this.ws = new WebSocket(
			`${Config.REVOLT_WEBSOCKET}?version=1&format=json`
		);

		this.callbacks = {};

		this.ws.onmessage = e => {
			const message: IEvent = JSON.parse(e.data);

			this.runCallbacks(message);
		};

		this.ws.onopen = () => {
			this.sendEvent(new AuthenticateEvent(token));

			setInterval(() => {
				this.sendEvent(new PingEvent());
			}, 20_000);
		};
	}

	on<T extends IEvent>(event: EventType, callback: (event: T) => void) {
		if (!Object.keys(this.callbacks).includes(event)) {
			this.callbacks[event] = [];
		}

		this.callbacks[event].push(callback);
	}

	onReady(callback: (event: ReadyEvent) => void) {
		this.on<ReadyEvent>(EventType.READY, callback);
	}

	onMessage(callback: (event: MessageEvent) => void) {
		this.on<MessageEvent>(EventType.MESSAGE, callback);
	}

	private sendEvent(event: IEvent) {
		this.ws.send(event.toJson());
	}

	private runCallbacks(message: IEvent) {
		this.callbacks[message.type]?.forEach(callback => {
			callback(message);
		});
	}
}

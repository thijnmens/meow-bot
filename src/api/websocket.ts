import Config from '../config';
import IEvent from '../types/IEvent';
import AuthenticateEvent from '../types/event/authenticateEvent';
import PingEvent from '../types/event/pingEvent';
import EventType from '../types/eventType';
import ReadyEvent from '../types/event/readyEvent';
import AuthenticatedEvent from '../types/event/authenticatedEvent';

export default class RevoltSocket {
	private readonly ws: WebSocket;

	private readonly onMessageCallbacks: OnMessageCallback[] = [];
	private readonly onReadyCallbacks: OnReadyCallback[] = [];
	private readonly onAuthenticatedCallbacks: OnAuthenticatedCallback[] = [];

	constructor() {
		this.ws = new WebSocket(
			`${Config.REVOLT_WEBSOCKET}?version=1&format=json`
		);

		this.ws.onmessage = e => {
			const message: IEvent = JSON.parse(e.data);
			switch (message.type) {
				case EventType.READY:
					this.runCallbacks(
						this.onReadyCallbacks,
						message as ReadyEvent
					);
					break;

				case EventType.AUTHENTICATED:
					this.runCallbacks(
						this.onAuthenticatedCallbacks,
						message as AuthenticatedEvent
					);
					break;

				default:
					throw new Error(
						`Received unknown message type ${message.type}`
					);
			}
		};

		this.ws.onopen = () => {
			this.sendEvent(new AuthenticateEvent(Config.REVOLT_TOKEN));

			setInterval(() => {
				this.sendEvent(new PingEvent());
			}, 20_000);
		};
	}

	onMessage(callback: OnMessageCallback) {
		this.onMessageCallbacks.push(callback);
	}

	onReady(callback: OnReadyCallback) {
		this.onReadyCallbacks.push(callback);
	}

	private sendEvent(event: IEvent) {
		this.ws.send(event.toJson());
	}

	private runCallbacks(callbacks: Function[], ...args: any[]) {
		callbacks.forEach(callback => {
			callback(...args);
		});
	}
}

type OnMessageCallback = (event: MessageEvent) => void;
type OnReadyCallback = (event: ReadyEvent) => void;
type OnAuthenticatedCallback = (event: AuthenticatedEvent) => void;

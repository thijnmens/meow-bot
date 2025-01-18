import axios, { AxiosResponse } from 'axios';
import Config from '../config';
import LoginDisabledResponse from '../types/loginResponse/loginDisabledResponse';
import LoginMfaResponse from '../types/loginResponse/loginMfaResponse';
import LoginSuccessResponse from '../types/loginResponse/loginSuccessResponse';
import RequestError from '../types/requestError';
import User from '../types/user';
import Result from '../types/result';
import Message from '../types/message';

export default class Api {
	protected token: string | undefined = undefined;

	constructor(token: string | undefined) {
		this.token = token;
	}

	/**
	 * Login with a user account
	 *
	 * @param email Email of user account
	 * @param password Password of user account
	 */
	async login(
		email: string,
		password: string
	): Promise<LoginSuccessResponse> {
		const response: AxiosResponse<any> = await axios.post(
			`${Config.REVOLT_API}/auth/session/login`,
			{
				email,
				password
			},
			{
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				}
			}
		);

		if (response.status !== 200)
			throw new Error(
				`Request failed (status: ${response.status} url: ${response.config.url})`
			);

		if (response.data?.result == Result.SUCCESS) {
			const data = response.data as LoginSuccessResponse;
			this.token = data.token;
			return data;
		} else if (response.data?.result == Result.MFA) {
			const data = response.data as LoginMfaResponse;
			throw new Error(
				`Failed to login because MFA is enabled (allowed login for account: ${data.allowed_methods})`
			);
		} else if (response.data?.result == Result.DISABLED) {
			const data = response.data as LoginDisabledResponse;
			throw new Error(
				`Failed to login because the account is disabled (user_id: ${data.user_id})`
			);
		} else if (response.data?.type) {
			const data = response.data as RequestError;
			throw new Error(
				`Failed to login because an error occurred (type: ${data.type}, location: ${data.location})`
			);
		}

		throw new Error(`Unknown response: ${JSON.stringify(response.data)}`);
	}

	/**
	 * Get currently logged-in user info
	 */
	async getSelf(): Promise<User> {
		this.isLoggedIn();

		const response: AxiosResponse<any> = await axios.get(
			`${Config.REVOLT_API}/users/@me`,
			{
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					'X-Bot-Token': Config.REVOLT_TOKEN
				}
			}
		);

		if (response.status !== 200)
			throw new Error(`Login failed (status: ${response.status})`);

		if (response.data?.username) {
			return response.data as User;
		} else if (response.data?.type) {
			const data = response.data as RequestError;
			throw new Error(
				`Failed to login because an error occurred (type: ${data.type}, location: ${data.location})`
			);
		}

		throw new Error(`Unknown response: ${JSON.stringify(response.data)}`);
	}

	/**
	 * Ban user from server
	 *
	 * @param serverId Id of the server
	 * @param userId Id of the user
	 * @param reason Reason for the ban
	 */
	async banUser(
		serverId: string,
		userId: string,
		reason: string = 'Banned by meow'
	) {
		this.isLoggedIn();

		const response: AxiosResponse<any> = await axios.put(
			`${Config.REVOLT_API}/servers/${serverId}/bans/${userId}`,
			{
				reason
			},
			{
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					'X-Bot-Token': Config.REVOLT_TOKEN
				}
			}
		);

		if (response.status !== 200)
			throw new Error(`Failed to ban user (status: ${response.status})`);

		if (response.data?._id?.server) {
			return;
		} else if (response.data?.type) {
			const data = response.data as RequestError;
			throw new Error(
				`Failed to ban user because an error occurred (type: ${data.type}, location: ${data.location})`
			);
		}

		throw new Error(`Unknown response: ${JSON.stringify(response.data)}`);
	}

	async sendMessage(channel: string, message?: string): Promise<Message> {
		this.isLoggedIn();

		const response: AxiosResponse<any> = await axios.post(
			`${Config.REVOLT_API}/channels/${channel}/messages`,
			{
				content: message
			},
			{
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					'X-Bot-Token': Config.REVOLT_TOKEN
				}
			}
		);

		if (response.status !== 200)
			throw new Error(`Login failed (status: ${response.status})`);

		if (response.data?.channel) {
			return response.data as Message;
		} else if (response.data?.type) {
			const data = response.data as RequestError;
			throw new Error(
				`Failed to send message because an error occurred (type: ${data.type}, location: ${data.location})`
			);
		}

		throw new Error(`Unknown response: ${JSON.stringify(response.data)}`);
	}

	async getUser(id: string): Promise<User> {
		this.isLoggedIn();

		const response: AxiosResponse<any> = await axios.get(
			`${Config.REVOLT_API}/users/${id}`,
			{
				headers: {
					'Content-Type': 'application/json',
					'Accept': 'application/json',
					'X-Bot-Token': Config.REVOLT_TOKEN
				}
			}
		);

		if (response.status !== 200)
			throw new Error(`Login failed (status: ${response.status})`);

		if (response.data?.username) {
			return response.data as User;
		} else if (response.data?.type) {
			const data = response.data as RequestError;
			throw new Error(
				`Failed to fetch server member because an error occurred (type: ${data.type}, location: ${data.location})`
			);
		}

		throw new Error(`Unknown response: ${JSON.stringify(response.data)}`);
	}

	/**
	 * Check if api is able to make authenticated requests
	 *
	 * @private
	 */
	isLoggedIn(throws?: boolean): boolean {
		if (this.token === undefined || this.token.length !== 64) {
			if (throws)
				throw new Error(
					'Not logged in, please call `Api.Login()` or provide a token in the Api constructor before calling this method'
				);

			return false;
		}

		return true;
	}
}

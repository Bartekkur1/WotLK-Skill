import { OAuthResponse } from "./types";
import { URLSearchParams } from 'url';
import axios from 'axios';
import { logger } from "../util/logger";

const httpClient = axios.create();

export const fetchUserInfo = async (token: string): Promise<any> => {
    try {
        const infoResponse = await httpClient.get('https://discordapp.com/api/users/@me', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return await infoResponse.data;
    } catch (err) {
        logger.error(err);
        throw new Error('Failed to fetch discord user information!');
    }
};

export const fetchAuthToken = async (code: string): Promise<OAuthResponse> => {
    const { DISCORD_CLIENT_ID, DISCORD_SECRET } = process.env;
    if (!DISCORD_CLIENT_ID || !DISCORD_SECRET) {
        throw new Error('Missing discord configuration!');
    }

    try {
        const form = new URLSearchParams({
            client_id: DISCORD_CLIENT_ID,
            client_secret: DISCORD_SECRET,
            code,
            grant_type: 'authorization_code',
            redirect_uri: `http://localhost:8000/auth`,
            scope: 'identify',
        });

        const oauthResult = await httpClient.post("https://discord.com/api/oauth2/token", form, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        })

        return await oauthResult.data as OAuthResponse;
    } catch (err) {
        logger.error(err);
        throw new Error("Discord token is invalid, try again!");
    }
}
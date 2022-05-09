import { User } from "../persistance/types";

export interface OAuthResponse {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
    token_type: string;
};

export interface JwtPayload {
    id: string;
    username: string;
    seed: string;
    iat: number;
}

export class AuthorizationError extends Error { };

export interface UserInformationResponse extends User { };
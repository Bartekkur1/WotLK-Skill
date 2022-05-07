export interface OAuthResponse {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
    token_type: string;
};

export interface UserInformationResponse {
    id: string;
    username: string;
    avatar: string;
    locale: string;
};
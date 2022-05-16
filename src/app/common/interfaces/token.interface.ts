interface Token {
	token_type: string;
	expires_in: number;
}

export interface KnownToken extends Token {
	known_token: string;
}

export interface AccessToken extends Token {
	access_token: string;
	refresh_token: string;
}

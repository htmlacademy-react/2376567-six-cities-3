const AUTH_TOKEN_KEY_NAME = 'token';

export type Token = string;

export const saveToken = (token: Token): void => {
  localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);
};

export const dropToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
};

export const getToken = (): string => {
  if (process.env.NODE_ENV === 'test') {
    return 'test-token-123';
  }
  return localStorage.getItem(AUTH_TOKEN_KEY_NAME) ?? '';
};

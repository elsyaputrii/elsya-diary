/** Tempat menyimpan token login. Key-nya harus sama dengan yang dibaca services/api.ts. */
const TOKEN_KEY = 'auth_token';

export const saveToken = (token: string) => sessionStorage.setItem(TOKEN_KEY, token);
export const clearToken = () => sessionStorage.removeItem(TOKEN_KEY);

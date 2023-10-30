export function getTokenLocalStorage(): string {
    const data = localStorage.getItem('token');
    const token: string = data ? JSON.parse(data) : '';
    return token;
}

export function setTokenLocalStorage(key: string, token: string): void {
    localStorage.setItem(key, JSON.stringify(token));
}

export function removeTokenLocalStorage(key: string): void {
    localStorage.removeItem(key);
}
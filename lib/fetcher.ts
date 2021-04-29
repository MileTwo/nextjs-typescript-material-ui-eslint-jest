export function fetcher<T>(url: string, init: RequestInit): Promise<T> {
    return fetch(url, init).then((res) => {
        return res.json();
    });
}

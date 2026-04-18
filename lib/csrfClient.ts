"use client";

let cachedCsrfToken: string | null = null;
let csrfTokenPromise: Promise<string> | null = null;

/**
 * Fetches and memoizes a CSRF token for browser-side mutating requests.
 */
export async function getCsrfToken(): Promise<string> {
    if (cachedCsrfToken) {
        return cachedCsrfToken;
    }

    if (!csrfTokenPromise) {
        csrfTokenPromise = fetch("/api/csrf", {
            cache: "no-store",
            credentials: "same-origin",
            method: "GET",
        })
            .then(async (response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch CSRF token");
                }

                const data = await response.json() as { token?: string };

                if (!data.token) {
                    throw new Error("Missing CSRF token");
                }

                cachedCsrfToken = data.token;

                return data.token;
            })
            .finally(() => {
                csrfTokenPromise = null;
            });
    }

    return csrfTokenPromise;
}

/**
 * Clears the memoized browser-side CSRF token.
 */
export function clearCsrfToken(): void {
    cachedCsrfToken = null;
    csrfTokenPromise = null;
}

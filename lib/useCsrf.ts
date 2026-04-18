"use client";

import { useEffect, useState } from "react";

import { getCsrfToken } from "@/lib/csrfClient";

/**
 * Prefetches a CSRF token for components that submit mutating requests.
 */
export function useCsrf(): string {
    const [csrfToken, setCsrfToken] = useState("");

    useEffect(() => {
        let isMounted = true;

        void getCsrfToken()
            .then((token) => {
                if (isMounted) {
                    setCsrfToken(token);
                }
            })
            .catch(() => {
                if (isMounted) {
                    setCsrfToken("");
                }
            });

        return () => {
            isMounted = false;
        };
    }, []);

    return csrfToken;
}

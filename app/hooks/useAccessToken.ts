import { useEffect, useState } from "react";

export function useAccessToken() {
    const [token, setToken] = useState<string | null>(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedToken = localStorage.getItem("accessToken");
            setToken(storedToken);
            setLoaded(true);
        }
    }, []);

    return { token, loaded };
}

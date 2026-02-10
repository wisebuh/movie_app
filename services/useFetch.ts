import { useEffect, useState, useCallback, useRef } from "react";

const useFetch = <T,>(fetchFunction: () => Promise<T>, autoFetch = true) => {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    
    const isMountedRef = useRef(true);

    const fetchData = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const result = await fetchFunction();

            if (isMountedRef.current) {
                setData(result);
            }
        } catch (err) {
            if (isMountedRef.current) {
                setError(err instanceof Error ? err : new Error("An error occurred"));
            }
        } finally {
            if (isMountedRef.current) {
                setLoading(false);
            }
        }
    }, [fetchFunction]);

    const reset = useCallback(() => {
        setData(null);
        setLoading(false);
        setError(null);
    }, []);

    useEffect(() => {
        // Reset mounted ref on each effect run
        isMountedRef.current = true; // ✅ Reset to true on mount/remount

        if (autoFetch) {
            fetchData();
        }

        return () => {
            isMountedRef.current = false; // Set to false on unmount
        };
    }, [autoFetch, fetchData]);

    return { data, loading, error, refetch: fetchData, reset };
};

export default useFetch;

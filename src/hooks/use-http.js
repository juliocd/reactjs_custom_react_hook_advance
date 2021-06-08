import { useState, useCallback } from 'react';

const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendRequest = useCallback(async (requestComfig, callback) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(
                requestComfig.url, {
                    method: requestComfig.method ? requestComfig.method : 'GET',
                    headers: requestComfig.headers ? requestComfig.headers : {},
                    body: requestComfig.body ? JSON.stringify(requestComfig.body): null
                }
            );

            if (!response.ok) {
                throw new Error('Request failed!');
            }

            const data = await response.json();
            callback(data);
        } catch (err) {
            setError(err.message || 'Something went wrong!');
        }

        setIsLoading(false);
    }, []);

    return {
        isLoading,
        error,
        sendRequest
    }
}

export default useHttp;
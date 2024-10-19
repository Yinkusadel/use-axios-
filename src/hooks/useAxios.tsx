import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';

interface UseAxiosConfig {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    url: string;
    data?: object; // Optional data for POST/PUT requests
    params?: object; // Optional URL parameters
}

export default function useAxios() {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const axiosInstance = axios.create({
        baseURL: "https://jsonplaceholder.typicode.com/"
    })

    axiosInstance.interceptors.request.use((config) => {
        return config
    },
        (error) => {
            return Promise.reject(error)
        }
    );

    axiosInstance.interceptors.response.use((response) => {
        return response
    },
        (error) => {
            return Promise.reject(error)
        }
    );


    let controller = new AbortController()

    useEffect(() => {
        return () => controller?.abort()
    }, [])

    const fetchData = async ({ url, method, data = {}, params = {} }: UseAxiosConfig) => {
        setLoading(true)

        controller.abort()
        controller = new AbortController()

        try {
            const result = await axiosInstance({
                url,
                method,
                data,
                params,
                signal: controller.signal
            })
            setResponse(result.data)
        } catch (error) {
            if (axios.isCancel(error)) {
                console.error("Request cancelled:", error.message);
            } else if (error instanceof AxiosError) {
                const errorMessage = error.response ? error.response.data : error.message;
                setError(errorMessage);
            } else {
                setError("An unexpected error occurred.");
                console.error("Unexpected error:", error);
            }
        } finally {
            setLoading(false)
        }
    };

    return { response, error, loading, fetchData }
}

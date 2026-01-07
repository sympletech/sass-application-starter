import axios from 'axios';
import useSWR from 'swr';

export const apiBaseUrl = (window.location.hostname === 'localhost')
    ? `http://localhost:${import.meta.env.VITE_SERVER_PORT}`
    : window.location.origin;

export const getData = async (route = '', params = {}) => {
    const sParams = new URLSearchParams(params);
    const targetURL = `${apiBaseUrl}${route}${sParams.size > 0 ? `?${sParams}` : ''}`;

    const response = await axios.get(targetURL, { withCredentials: true });
    return response.data;
}

export const postData = async (route = '', payload = {}) => {
    const targetURL = `${apiBaseUrl}${route}`;
    const response = await axios.post(targetURL, payload, { withCredentials: true });
    return response.data;
};

export const useApiGet = (route = '', { params = {}, requiredParams = [], defaultValue = {}, transformData = (data) => data }) => {
    const sParams = new URLSearchParams(params);
    const targetURL = `${apiBaseUrl}${route}${sParams.size > 0 ? `?${sParams}` : ''}`;

    const fetcher = async () => {
        for (const requiredParam of requiredParams) {
            if (params[requiredParam] === undefined || params[requiredParam] === null) {
                return defaultValue;
            }
        }

        const response = await getData(route, params);

        const transformedData = await transformData(response);

        return transformedData || response;
    };

    const { data, error, isLoading } = useSWR(targetURL, fetcher);

    return [data || defaultValue, error, isLoading];
};

export const useApiPost = (route = '', { payload = {}, requiredParams = [], defaultValue = {}, transformData = (data) => data }) => {
    const targetURL = `${apiBaseUrl}${route}`;

    const fetcher = async () => {
        for (const requiredParam of requiredParams) {
            if (payload[requiredParam] === undefined) {
                return defaultValue;
            }
        }

        const response = await postData(route, payload);

        const transformedData = await transformData(response);

        return transformedData || response;
    };

    const cacheKey = `${targetURL}-${JSON.stringify(payload)}`;

    const { data, error, isLoading } = useSWR(cacheKey, fetcher);

    return [data || defaultValue, error, isLoading];
};


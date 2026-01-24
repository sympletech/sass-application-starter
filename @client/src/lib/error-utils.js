import { message } from 'antd';

/**
 * Standardized error handler for API calls.
 * Checks for error response data, error message, or falls back to default message.
 * @param {Error} error - The error object from a failed API call
 * @param {string} defaultMessage - Fallback message if no specific error is found
 * @param {string} messageType - Type of message to display ('error' or 'info')
 */
export const handleApiError = (error, defaultMessage = 'An error occurred', messageType = 'error') => {
    if (error?.response?.data?.error) {
        message[messageType](error.response.data.error);
    } else if (error?.message) {
        message[messageType](error.message);
    } else {
        message[messageType](defaultMessage);
    }
};

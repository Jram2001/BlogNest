import Axios, { AxiosError, type AxiosResponse, type InternalAxiosRequestConfig } from "axios";

const apiClient = Axios.create({
    baseURL: 'https://blognest-jm20.onrender.com/api',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers = config.headers || {};
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// Response interceptor
apiClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// Export the instance
export default apiClient;

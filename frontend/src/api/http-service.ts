import apiClient from "./http-client";

// Common GET
export const httpGet = async <T>(
    url: string,
    params: Record<string, unknown> = {}
): Promise<T> => {
    const response = await apiClient.get<T>(url, { params });
    return response.data;
};

// Common POST
export const httpPost = async <T, TData = unknown>(
    url: string,
    data: TData
): Promise<T> => {
    const response = await apiClient.post<T>(url, data);
    return response.data;
};

// Common PUT
export const httpPut = async <T, TData = unknown>(
    url: string,
    data: TData
): Promise<T> => {
    const response = await apiClient.put<T>(url, data);
    return response.data;
};

// Common DELETE
export const httpDelete = async <T>(url: string): Promise<T> => {
    const response = await apiClient.delete<T>(url);
    return response.data;
};

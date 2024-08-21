import axios, { AxiosResponse } from 'axios';

export abstract class HttpServices {
    protected static async get<DataResponse = any>(url: string, config?: any): Promise<AxiosResponse> {
        try {
            const response = await axios.get(`${url}`);
            return response;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    protected static async post<DataResponse = any>(url: string, data: any): Promise<AxiosResponse> {
        try {
            const response = await axios.post(`${url}`, data);
            return response;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    protected static async put<DataResponse = any>(url: string, data: any): Promise<AxiosResponse> {
        try {
            const response = await axios.put(`${url}`, data);
            return response;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    protected static async del<DataResponse = any>(url: string): Promise<AxiosResponse> {
        try {
            const response = await axios.delete(`${url}`);
            return response;
        } catch (error: any) {
            throw new Error(error.message);
        }
    }
}

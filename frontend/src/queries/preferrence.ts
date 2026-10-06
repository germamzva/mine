// api requests for preferrence
import apiRequest from "../utils/apiRequest";

// types
import type { Preferrence } from "../types/preferrence.type";

export const getPreferrences = async () => {
    // eslint-disable-next-line
    try {
        const response = await apiRequest.get("/preferrence");
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

export const addPreferrence = async (data: Preferrence) => {
    // eslint-disable-next-line
    try {
        const response = await apiRequest.post("/preferrence/create", data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const updatePreferrence = async (id: string, data: Preferrence) => {
    // eslint-disable-next-line
    try {
        const response = await apiRequest.put(`/preferrence/edit/${id}`, data);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const getPreferrenceById = async (id: string) => {
    // eslint-disable-next-line
    try {
        const response = await apiRequest.get(`/preferrence/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deletePreferrence = async (id: string) => {
    // eslint-disable-next-line
    try {
        const response = await apiRequest.delete(`/preferrence/delete/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};


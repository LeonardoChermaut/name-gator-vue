import axios from "axios";

export const BASE_URL = "http://localhost:4000";

export const useAxios = async (method, data = {}) => {
    const error = [];
    try {
        return await axios({
            baseURL: BASE_URL,
            method: method.toLowerCase(),
            data,
        });
    } catch ({ message }) {
        //Todo: Add error handling
        error.push(message);
        throw "Something went wrong!";
    }
};
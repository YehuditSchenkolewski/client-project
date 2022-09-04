import axios from "axios";

export function authHeader() {
    const userStr = localStorage.getItem("token");

    if (userStr) {
        return { Authorization: 'Bearer ' + userStr };
    } else {
        return { Authorization: '' };
    }
}

export const login = async (username, password) => {
    return axios
    //process.env
        .post(process.env.REACT_APP_HOST + "authenticate", {
            username,
            password,
        })
        .then((response) => {
            return response.data && response.data[0];
        })
};

export const logout = () => {
    localStorage.removeItem("token");
};
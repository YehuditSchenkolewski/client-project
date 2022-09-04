import axios from "axios";
import * as AuthService from "./auth.services";

export const getUserInfo = () => {
    return axios.get(
        process.env.REACT_APP_HOST + "info",
        {
            headers: AuthService.authHeader()
        }
    );
};

export const getPersonalDetailsByToken = (token) => {
    //return personal deatils
    //endpoint in server -get token
    //mock data
    return {
        "id": "1",
        "name": "Test Test",
        "Team": "Developers",
        "joinedAt": "2018-10-01",
        "avatar": "https://avatarfiles.alphacoders.com/164/thumb-164632.jpg"
    }
}

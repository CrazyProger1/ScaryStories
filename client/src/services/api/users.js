import {makeRequest} from './api';


export const registerUser = async (user) =>
    await makeRequest({
            method: "POST",
            url: "users/register",
            data: user
        }
    )


export const loginUser = async (user) =>
    await makeRequest({
            method: "POST",
            url: "users/login",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            data: user
        }
    )


export const logoutUser = async (token) =>
    await makeRequest({
            method: "POST",
            url: "users/logout",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: "Bearer " + token
            }
        }
    )

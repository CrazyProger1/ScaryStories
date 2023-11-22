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


import {makeRequest} from './api';


export const registerUser = async (user) =>
    await makeRequest({
            method: 'POST',
            url: '/users/register',
            data: user
        }
    )


export const loginUser = async (user) =>
    await makeRequest({
            method: 'POST',
            url: '/users/login',
            data: user
        }
    )


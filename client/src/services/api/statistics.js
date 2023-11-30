import {makeRequest} from './api';


export const readUserStatistics = async (id) =>
    await makeRequest({
            method: "GET",
            url: "statistics/users/" + id
        }
    )
import {makeRequest} from './api';


export const readCategories = async () =>
    await makeRequest({
            method: "GET",
            url: "stories/categories"
        }
    )
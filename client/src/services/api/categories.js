import {makeRequest} from './api';


export const readCategories = async () =>
    await makeRequest({
            method: "GET",
            url: "stories/categories"
        }
    )

export const createCategory = async (category, token) =>
    await makeRequest({
            method: "POST",
            url: "stories/categories",
            data: category,
            headers: {
                Authorization: "Bearer " + token
            }
        }
    )

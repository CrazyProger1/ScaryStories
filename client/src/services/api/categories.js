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


export const updateCategory = async (category, token) =>
    await makeRequest({
            method: "PATCH",
            url: "stories/categories/" + category.id,
            data: category,
            headers: {
                Authorization: "Bearer " + token
            }
        }
    )


export const deleteCategory = async (categoryId, token) =>
    await makeRequest({
            method: "DELETE",
            url: "stories/categories/" + categoryId,
            headers: {
                Authorization: "Bearer " + token
            }
        }
    )

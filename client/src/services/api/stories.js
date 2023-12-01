import {makeRequest} from './api';


export const readStories = async (filters = {}, sorts = {}) =>
    await makeRequest({
            method: "GET",
            url: "stories",
            params: {
                ...filters,
                ...sorts
            }
        }
    )


export const readStory = async (id) =>
    await makeRequest({
            method: "GET",
            url: "stories/" + id
        }
    )


export const createStory = async (story, token) =>
    await makeRequest({
            method: "POST",
            url: "stories",
            data: story,
            headers: {
                Authorization: "Bearer " + token
            }
        }
    )


export const updateStory = async (story, token) =>
    await makeRequest({
            method: "PATCH",
            url: "stories/" + story.id,
            data: story,
            headers: {
                Authorization: "Bearer " + token
            }
        }
    )


export const deleteStory = async (id, token) =>
    await makeRequest({
            method: "DELETE",
            url: "stories/" + id,
            headers: {
                Authorization: "Bearer " + token
            }
        }
    )

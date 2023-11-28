import {makeRequest} from './api';


export const readStories = async (categoryId) =>
    await makeRequest({
            method: "GET",
            url: "stories",
            params: {
                category_id: categoryId,
            }
        }
    )


export const readStory = async (storyId) =>
    await makeRequest({
            method: "GET",
            url: "stories/" + storyId
        }
    )
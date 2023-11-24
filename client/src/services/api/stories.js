import {makeRequest} from './api';


export const readStories = async () =>
    await makeRequest({
            method: "GET",
            url: "stories"
        }
    )


export const readStory = async (storyId) =>
    await makeRequest({
            method: "GET",
            url: "stories/" + storyId
        }
    )
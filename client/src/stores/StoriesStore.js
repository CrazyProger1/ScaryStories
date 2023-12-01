import {makeObservable, action, observable} from 'mobx';
import {createStory, deleteStory, readStories, readStory, updateStory} from "../services/api/stories";
import authStore from "./AuthStore";
import {validateResponse} from "../utils/validators/responses";

class StoriesStore {
    stories = [];

    constructor() {
        makeObservable(this,
            {
                stories: observable,
                readStories: action,
                readStory: action,
                createStory: action,
                updateStory: action,
                deleteStory: action
            }
        )
    }


    async readStories(categoryId = null, authorId = null) {
        this.stories = [];
        const response = await readStories(categoryId, authorId)
        validateResponse(response, [200])
        this.stories = response?.data.results;
    }


    async readStory(id) {
        const response = await readStory(id)
        validateResponse(response, [200])
        return response.data;
    }

    async createStory(name, pictureUrl, story, categoryId) {
        const response = await createStory(
            {
                name: name,
                picture_url: pictureUrl,
                story: story,
                category_id: categoryId
            }, authStore.token)

        validateResponse(response, [201])
        this.stories.push(response.data)
    }

    async updateStory(id, name, pictureUrl, text) {
        const response = await updateStory({
            id: id,
            name: name,
            picture_url: pictureUrl,
            story: text
        }, authStore.token)
        validateResponse(response, [204])
        this.stories.map(story => {
            if (story.id === id) {
                story.name = name;
                story.picture_url = pictureUrl;
                story.story = text;
            }
        })
    }


    async deleteStory(id) {
        const response = await deleteStory(id, authStore.token)
        validateResponse(response, [204])
        this.stories = this.stories.filter(story => story.id !== id)
    }
}


export default new StoriesStore();
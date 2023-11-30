import {makeObservable, action, observable} from 'mobx';
import {createStory, deleteStory, readStories, readStory, updateStory} from "../services/api/stories";
import authStore from "./AuthStore";

class StoriesStore {
    stories = [];

    constructor() {
        makeObservable(this,
            {
                stories: observable,
                loadStories: action,
                loadStory: action,
                createStory: action,
                updateStory: action,
                deleteStory: action
            }
        )
    }


    async loadStories(categoryId) {
        this.stories = [];
        await readStories(categoryId).then((response) => {
            if (response.status === 200)
                this.stories = response?.data.results;
        })
    }


    async loadStory(id) {
        return await readStory(id).then((response) => {
            if (response.status === 200)
                return response.data;
        })
    }

    async createStory(name, pictureUrl, story, categoryId) {
        await createStory(
            {
                name: name,
                picture_url: pictureUrl,
                story: story,
                category_id: categoryId
            }, authStore.token).then(
            response => {
                if (response.status === 201) {
                    this.stories.push(response.data)
                }
            }
        )
    }

    async updateStory(id, name, pictureUrl, text) {
        await updateStory({id: id, name: name, picture_url: pictureUrl, story: text}, authStore.token).then(response => {
            if (response.status === 204) {
                this.stories.map(story => {
                    if (story.id === id) {
                        story.name = name;
                        story.picture_url = pictureUrl;
                        story.story = text;
                    }
                });
            }
        })
    }


    async deleteStory(id) {
        await deleteStory(id, authStore.token).then(response => {
            if (response.status === 204) {
                this.stories = this.stories.filter(story => story.id !== id)
            }
        })
    }
}


export default new StoriesStore();
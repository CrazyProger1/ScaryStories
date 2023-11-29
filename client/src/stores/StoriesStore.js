import {makeObservable, action, observable} from 'mobx';
import {createStory, readStories, readStory} from "../services/api/stories";
import authStore from "./AuthStore";

class StoriesStore {
    stories = [];

    constructor() {
        makeObservable(this,
            {
                stories: observable,
                loadStories: action,
                loadStory: action,
                createStory: action
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


    async loadStory(storyId) {
        return await readStory(storyId).then((response) => {
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
                    console.log(response.data)
                    this.stories.push(response.data)
                }

            }
        )
    }


}


export default new StoriesStore();
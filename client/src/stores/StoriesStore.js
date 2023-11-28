import {makeObservable, action, observable} from 'mobx';
import {readStories, readStory} from "../services/api/stories";

class StoriesStore {
    stories = [];

    constructor() {
        makeObservable(this,
            {
                stories: observable,
                loadStories: action
            }
        )
    }


    async loadStories(categoryId) {
        await readStories().then((response) => {
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


}


export default new StoriesStore();
import {makeObservable, action, observable} from 'mobx';
import {readStories, readStory} from "../services/api/stories";

class StoriesStore {
    stories = [
        {
            "id": 2,
            "name": "string",
            "author": {
                "id": 1,
                "email": "user@example.com",
                "is_active": true,
                "is_superuser": true,
                "is_verified": false,
                "nickname": "crazyproger1",
                "registered_at": "2023-11-22T13:15:17.471551"
            },
            "category": {
                "id": 1,
                "name": "Abandoned Buildings",
                "picture_url": "https://cdn.hswstatic.com/gif/abandoned-1-original.jpg"
            },
            "rating": 0,
            "read_time": 0.004,
            "views": 0,
            "comments_number": 0,
            "create_date": "2023-11-24T00:00:00",
            "picture_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJyUOjRiaORgoiCXWgzyn9luGuE8zpqjWItQ&usqp=CAU"
        },
        {
            "id": 4,
            "name": "string3",
            "author": {
                "id": 1,
                "email": "user@example.com",
                "is_active": true,
                "is_superuser": true,
                "is_verified": false,
                "nickname": "Abc",
                "registered_at": "2023-11-22T13:15:17.471551"
            },
            "category": {
                "id": 1,
                "name": "Abandoned Buildings",
                "picture_url": "https://cdn.hswstatic.com/gif/abandoned-1-original.jpg"
            },
            "rating": 0,
            "read_time": 0.004666666666666667,
            "views": 0,
            "comments_number": 0,
            "create_date": "2023-11-24T00:00:00",
            "picture_url": "string2"
        },
        {
            "id": 5,
            "name": "string4",
            "author": {
                "id": 1,
                "email": "user@example.com",
                "is_active": true,
                "is_superuser": true,
                "is_verified": false,
                "nickname": "Abc",
                "registered_at": "2023-11-22T13:15:17.471551"
            },
            "category": {
                "id": 1,
                "name": "Abandoned Buildings",
                "picture_url": "https://cdn.hswstatic.com/gif/abandoned-1-original.jpg"
            },
            "rating": 0,
            "read_time": 0.004666666666666667,
            "views": 0,
            "comments_number": 0,
            "create_date": "2023-11-24T00:00:00",
            "picture_url": "string2"
        },
        {
            "id": 6,
            "name": "string5",
            "author": {
                "id": 1,
                "email": "user@example.com",
                "is_active": true,
                "is_superuser": true,
                "is_verified": false,
                "nickname": "Abc",
                "registered_at": "2023-11-22T13:15:17.471551"
            },
            "category": {
                "id": 1,
                "name": "Abandoned Buildings",
                "picture_url": "https://cdn.hswstatic.com/gif/abandoned-1-original.jpg"
            },
            "rating": 0,
            "read_time": 0.004666666666666667,
            "views": 0,
            "comments_number": 0,
            "create_date": "2023-11-24T00:00:00",
            "picture_url": "string2"
        }
    ];

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
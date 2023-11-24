import {makeObservable, action, observable} from 'mobx';
import {readCategories} from "../services/api/categories";

class CategoriesStore {
    categories = [
        {
            id: 1,
            name: 'Abandoned Buildings',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6WxiqS-YAJNYFBIRmb93LkLhzOMtWrpGGuQ&usqp=CAU'
        },
        {
            id: 2,
            name: 'Category 2',
            image: 'https://obninsk.name/UserFiles/Image/202304/2023-04-30-00-12-54.jpg'
        },
        {
            id: 3,
            name: 'Category 3',
            image: 'https://cs8.pikabu.ru/post_img/big/2016/02/13/12/1455396840122133493.jpg'
        }
    ];

    constructor() {
        makeObservable(this,
            {
                categories: observable,
                loadCategories: action
            }
        )
    }


    async loadCategories() {
        await readCategories().then((response) => {
            if (response.status === 200)
                this.categories = response?.data.results;
        })
    }


}


export default new CategoriesStore();
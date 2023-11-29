import {makeObservable, action, observable} from 'mobx';
import {createCategory, readCategories} from "../services/api/categories";
import authStore from "./AuthStore";

class CategoriesStore {
    categories = [];

    constructor() {
        makeObservable(this,
            {
                categories: observable,
                loadCategories: action,
                createCategory: action,
            }
        )
    }


    async loadCategories() {
        await readCategories().then((response) => {
            if (response.status === 200)
                this.categories = response?.data.results;
        })
    }

    async createCategory(name, pictureUrl) {
        await createCategory({name: name, picture_url: pictureUrl}, authStore.token).then(
            response => {
                if (response.status === 201)
                    this.categories.push(response.data)

            }
        )
    }


}


export default new CategoriesStore();
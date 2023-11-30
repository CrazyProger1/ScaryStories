import {makeObservable, action, observable} from 'mobx';
import {createCategory, deleteCategory, readCategories, updateCategory} from "../services/api/categories";
import authStore from "./AuthStore";

class CategoriesStore {
    categories = [];

    constructor() {
        makeObservable(this,
            {
                categories: observable,
                readCategories: action,
                createCategory: action,
                updateCategory: action,
                deleteCategory: action
            }
        )
    }


    async readCategories() {
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


    async updateCategory(id, name, pictureUrl) {
        await updateCategory({id: id, name: name, picture_url: pictureUrl}, authStore.token).then(
            response => {
                if (response.status === 204) {
                    this.categories.map(category => {
                        if (category.id === id) {
                            category.name = name;
                            category.picture_url = pictureUrl;
                        }
                    });
                }

            }
        )
    }

    async deleteCategory(id) {
        await deleteCategory(id, authStore.token).then(
            response => {
                if (response.status === 204)
                    this.categories = this.categories.filter(category => category.id !== id);
            }
        )
    }


}


export default new CategoriesStore();
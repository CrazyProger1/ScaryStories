import {makeObservable, action, observable, runInAction} from 'mobx';
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
        const response = await readCategories()
        if (response.status === 200)
            this.categories = response?.data.results;

    }

    async createCategory(name, pictureUrl) {
        const response = await createCategory({name: name, picture_url: pictureUrl}, authStore.token)
        if (response.status === 201)
            this.categories.push(response.data)


    }


    async updateCategory(id, name, pictureUrl) {
        const categoryToUpdate = {id: id, name: name, picture_url: pictureUrl}

        const response = await updateCategory(
            categoryToUpdate,
            authStore.token
        );

        if (response.status === 204) {
            const index = this.categories.findIndex(category => category.id === id);
            this.categories[index] = categoryToUpdate;
            console.log(categoryToUpdate)
        }
    }

    async deleteCategory(id) {
        const response = await deleteCategory(id, authStore.token)
        if (response.status === 204)
            this.categories = this.categories.filter(category => category.id !== id);


    }


}


export default new CategoriesStore();
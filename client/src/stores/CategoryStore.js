import {observable, action, makeObservable} from 'mobx';
import {getCategories} from "../services/api/categories";

class CategoryStore {
    categories = []

    constructor() {
        makeObservable(this,
            {
                categories: observable,
                loadCategories: action
            }
        )
    }


    async loadCategories() {
        await getCategories()
            .then(result =>
                this.categories = result?.data
            )
    }


}

export default CategoryStore;
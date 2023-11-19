import {makeObservable, action, observable} from 'mobx';

export default class UIStore {
    currentPage = '/'

    constructor() {
        makeObservable(this,
            {
                currentPage: observable,
                setPage: action
            }
        )
    }

    setPage(page) {
        this.currentPage = page;
    }
}

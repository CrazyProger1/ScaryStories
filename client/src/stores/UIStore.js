import {makeObservable, action, observable} from 'mobx';

class UIStore {
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


export default new UIStore();
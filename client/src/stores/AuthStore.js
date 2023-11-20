import {makeObservable, action, observable} from 'mobx';

class AuthStore {
    isAuthorized = false;

    constructor() {
        makeObservable(this,
            {
                isAuthorized: observable,
                login: action,
                register: action,
                logout: action
            }
        )
    }


    login = async (username, password) => {
        this.isAuthorized = true;
    }

    register = async (username, password) => {
        this.isAuthorized = true;
    }


    logout = async () => {

    }


}


export default new AuthStore();
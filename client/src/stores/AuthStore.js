import {makeObservable, action, observable} from 'mobx';
import {loginUser, registerUser} from "../services/api/users";

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


    login = async (login, password) => {
        this.isAuthorized = true;

        await loginUser({
            username: login,
            password: password
        }).then((resp) => {
            console.log(resp)
        })


    }

    register = async (login, password) => {
        this.isAuthorized = true;
        await registerUser({
            email: login,
            password: password,
            username: login
        }).then((resp) => {
                console.log(resp)
            }
        )
    }


    logout = async () => {

    }


}


export default new AuthStore();
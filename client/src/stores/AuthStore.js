import {makeObservable, action, observable} from 'mobx';
import {loginUser, logoutUser, registerUser} from "../services/api/users";

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
            password: password,
            username: login
        }).then((resp) => {
            console.log(resp)
        })


    }

    register = async (login, nickname, password) => {
        this.isAuthorized = true;
        await registerUser({
            email: login,
            password: password,
            nickname: nickname
        }).then((resp) => {
                console.log(resp)
            }
        )
    }


    logout = async () => {
        this.isAuthorized = false;
        // await logoutUser()
    }


}


export default new AuthStore();
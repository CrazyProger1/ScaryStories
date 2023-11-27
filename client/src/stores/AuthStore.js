import {makeObservable, action, observable} from 'mobx';
import {loginUser, logoutUser, readUser, registerUser} from "../services/api/users";

class AuthStore {
    isAuthorized = false;
    currentUser = {};
    token = null;

    constructor() {
        makeObservable(this,
            {
                isAuthorized: observable,
                login: action,
                register: action,
                logout: action,
                updateUserData: action
            }
        )
    }

    updateUserData = async () => {
        if (!this.isAuthorized)
            return

        await readUser("me", this.token).then(
            (resp) => {
                if (resp.status === 200)
                    this.currentUser = resp.data;
            }
        );

    }

    login = async (login, password) => {


        await loginUser({
            password: password,
            username: login
        }).then((resp) => {
            if (resp.status === 200) {
                this.isAuthorized = true;
                this.token = resp.data.access_token;
                this.updateUserData();
            }


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
        this.token = null;
        this.currentUser = {};
        // await logoutUser()
    }


}


export default new AuthStore();
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
                currentUser: observable,
                token: observable,
                login: action,
                register: action,
                logout: action,
                updateUserData: action
            }
        )
        this.loadData();
    }

    saveData = () => {
        localStorage.setItem("auth", JSON.stringify({
            isAuthorized: true,
            currentUser: this.currentUser,
            token: this.token
        }));
    }

    loadData = () => {
        const jsonData = localStorage.getItem("auth");
        if (jsonData) {
            const data = JSON.parse(jsonData)
            this.token = data.token;
            this.isAuthorized = data.isAuthorized;
            this.currentUser = data.currentUser;
        }

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
        this.saveData();

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
        await registerUser({
            email: login,
            password: password,
            nickname: nickname
        }).then((resp) =>
            this.login(login, password)
        )
    }


    logout = async () => {
        this.isAuthorized = false;
        this.token = null;
        this.currentUser = {};
        this.saveData();
    }


}


export default new AuthStore();
import {makeObservable, action, observable} from 'mobx';
import {deleteUser, loginUser, logoutUser, readUser, registerUser} from "../services/api/users";
import {validateResponse} from "../utils/validators/responses";

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
                loginUser: action,
                registerUser: action,
                logoutUser: action,
                refreshCurrentUser: action,
                readUser: action,
                deleteUser: action,
                checkCurrentToken: action
            }
        )
        this.loadData();
    }

    saveData() {
        localStorage.setItem("auth", JSON.stringify({
            isAuthorized: true,
            currentUser: this.currentUser,
            token: this.token
        }));
    }

    loadData() {
        const jsonData = localStorage.getItem("auth");
        if (jsonData) {
            const data = JSON.parse(jsonData)
            this.token = data.token;
            this.isAuthorized = data.isAuthorized;
            this.currentUser = data.currentUser;
        }

        this.checkCurrentToken()
    }

    async checkCurrentToken() {
        await this.refreshCurrentUser().catch(_ => {
            this.logoutUser()
        });
    }

    async refreshCurrentUser() {
        if (!this.isAuthorized)
            return

        this.currentUser = await this.readUser("me", this.token)
        this.saveData();
    }

    async readUser(id) {
        const response = await readUser(id, this.token)
        validateResponse(response, [200]);
        return response.data;
    }

    async loginUser(login, password) {
        const credentials = {
            password: password,
            username: login
        }
        const response = await loginUser(credentials)
        validateResponse(response, [200]);
        this.isAuthorized = true;
        this.token = response.data.access_token;
        await this.refreshCurrentUser();
    }

    async registerUser(login, nickname, password) {
        const data = {
            email: login,
            password: password,
            nickname: nickname
        };
        const response = await registerUser(data)
        validateResponse(response, [201]);
        await this.loginUser(login, password)
    }


    async logoutUser() {
        this.isAuthorized = false;
        this.token = null;
        this.currentUser = {};
        this.saveData();
    }

    async deleteUser() {
        if (this.isAuthorized) {
            await deleteUser(this.currentUser.id, this.token)
            await this.logoutUser();
        }
    }
}


export default new AuthStore();
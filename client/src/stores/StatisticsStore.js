import {action, makeObservable, observable} from "mobx";
import {readUserStatistics} from "../services/api/statistics";


class StatisticsStore {
    constructor() {
        makeObservable(this,
            {
                readUserStatistics: action
            }
        )
    }


    async readUserStatistics(id) {
        return await readUserStatistics(id).then(response => {
            if (response.status === 200) {
                return response.data;
            }
        })
    }
}

export default new StatisticsStore();
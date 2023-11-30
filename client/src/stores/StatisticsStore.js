import {action, makeObservable} from "mobx";
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
        const result = {
            viewsNumber: 0,
            storiesNumber: 0
        }
        return await readUserStatistics(id).then(response => {
            if (response.status === 200) {
                const data = response.data;
                result.viewsNumber = data?.views_number;
                result.storiesNumber = data?.stories_number;
                return result;
            } else
                return result;

        })
    }
}

export default new StatisticsStore();
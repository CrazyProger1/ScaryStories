import {action, makeObservable} from "mobx";
import {readUserStatistics} from "../services/api/statistics";
import {validateResponse} from "../utils/validators/responses";


class StatisticsStore {
    constructor() {
        makeObservable(this,
            {
                readUserStatistics: action
            }
        )
    }


    async readUserStatistics(id) {
        const response = await readUserStatistics(id)
        validateResponse(response, [200])
        const data = response.data;
        return {
            viewsNumber: data?.views_number,
            storiesNumber: data?.stories_number
        };


    }
}

export default new StatisticsStore();
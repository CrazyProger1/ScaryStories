import {useNavigate} from "react-router-dom";
import uiStore from "../stores/UIStore";

const useNavigateCustom = () => {
    const navigate = useNavigate();


    return (page) => {
        navigate(page);
        uiStore.setPage(page)
    }
}

export default useNavigateCustom;
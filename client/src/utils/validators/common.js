import {URL_EXPR} from "../../constants/validation";

export const validatePictureUrl = (url) => {
    return !url || URL_EXPR.test(url);
}

export const validateName = (name) => {
    return !!name && name.length <= 50;
}

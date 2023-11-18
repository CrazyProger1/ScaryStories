import {EMAIL_EXPR, PASSWORD_EXPR} from "../../constants/validation";

export const validateEmail = (email) => {
    return EMAIL_EXPR.test(email);
}


export const validatePassword = (password) => {
    return PASSWORD_EXPR.test(password);
}
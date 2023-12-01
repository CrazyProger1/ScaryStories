export const EMAIL_EXPR = RegExp("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$");
export const PASSWORD_EXPR = RegExp("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$");

export const URL_EXPR = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
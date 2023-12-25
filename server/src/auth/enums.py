from enum import Enum


class ErrorMessages(Enum):
    NOT_FOUND = 'User not found!'
    IS_NOT_SUPERUSER = "You don't have permission to perform this action!"

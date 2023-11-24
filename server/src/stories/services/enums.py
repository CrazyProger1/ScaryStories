from enum import Enum


class ErrorMessages(str, Enum):
    NO_PERMISSION = "You don't have permission to perform this action"
    NOT_FOUND = 'Not found'
    CATEGORY_NOT_FOUND = 'Category not found'
    CATEGORY_WITH_NAME_ALREADY_EXISTS = 'Category with such name already exists'
    ALREADY_VOTED = 'You have already voted for this story'
    STORY_NOT_FOUND = 'Story not found'
    CATEGORY_IN_USE = 'Category in use'

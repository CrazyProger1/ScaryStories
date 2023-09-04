from enum import Enum


class ErrorMessages(str, Enum):
    NO_PERMISSION = "You don't have permission to perform this action"
    NOT_FOUND = 'Not found'
    CATEGORY_NOT_FOUND = 'Category not found'
    CATEGORY_ALREADY_EXISTS = 'Category already exists'
    ALREADY_VOTED = 'You have already voted for this story'
    STORY_NOT_FOUND = 'Story not found'


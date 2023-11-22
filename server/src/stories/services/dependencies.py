from functools import cache

from src.stories.repositories import story_categories_repository
from .categories import CategoryService


@cache
def story_categories_service():
    return CategoryService(story_categories_repository())

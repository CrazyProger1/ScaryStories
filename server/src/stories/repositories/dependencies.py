from functools import cache

from .categories import CategoryRepository


@cache
def story_categories_repository():
    return CategoryRepository()

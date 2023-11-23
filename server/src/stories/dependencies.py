from functools import cache

from src.stories.repositories import CategoryRepository
from src.stories.serializers import CategorySerializer
from src.stories.services.categories import CategoryService


@cache
def story_categories_service():
    return CategoryService(CategoryRepository(), CategorySerializer())

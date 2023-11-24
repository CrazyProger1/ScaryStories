from functools import cache

from src.stories.repositories import CategoriesRepository, StoriesRepository
from src.stories.serializers import CategoriesSerializer, StoriesSerializer
from src.stories.services import CategoriesService, StoriesService


@cache
def story_categories_service():
    return CategoriesService(CategoriesRepository, CategoriesSerializer)


@cache
def stories_service():
    return StoriesService(StoriesRepository, StoriesSerializer)

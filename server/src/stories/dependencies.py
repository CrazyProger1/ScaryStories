from functools import cache

from src.stories.repositories import CategoriesRepository, StoriesRepository
from src.stories.serializers import CategoriesSerializer, StoriesSerializer
from src.stories.services import CategoriesService, StoriesService
from src.auth.serializers import UsersSerializer
from src.auth.dependencies import users_service


@cache
def categories_service():
    return CategoriesService(
        category_repository=CategoriesRepository(),
        category_serializer=CategoriesSerializer())


@cache
def stories_service():
    return StoriesService(
        stories_repository=StoriesRepository(),
        stories_serializer=StoriesSerializer(),
        users_serializer=UsersSerializer(),
        categories_service=categories_service(),
        users_service=users_service()
    )

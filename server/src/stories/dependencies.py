from src.stories.repositories import StoriesRepository, StoryCategoriesRepository
from src.stories.services import StoriesService, StoryCategoriesService


def stories_service():
    return StoriesService(StoriesRepository)


def story_categories_service():
    return StoryCategoriesService(StoryCategoriesRepository)

from src.stories.repositories import StoriesRepository
from src.stories.services import StoriesService


def stories_service():
    return StoriesService(StoriesRepository)

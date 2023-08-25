from src.stories.repositories import StoriesRepository, StoryCategoriesRepository, StoryVotesRepository
from src.stories.services import StoriesService, StoryCategoriesService, StoryVotesService


def stories_service():
    return StoriesService(StoriesRepository)


def story_categories_service():
    return StoryCategoriesService(StoryCategoriesRepository)


def story_votes_service():
    return StoryVotesService(StoryVotesRepository)
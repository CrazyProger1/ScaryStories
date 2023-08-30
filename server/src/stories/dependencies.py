from src.stories.repositories import (
    StoriesRepository,
    StoryCategoriesRepository,
    StoryVotesRepository,
    StoryCommentsRepository
)
from src.stories.services import (
    StoriesService,
    StoryCategoriesService,
    StoryVotesService,
    StoryCommentsService
)


def stories_service():
    return StoriesService(StoriesRepository)


def story_categories_service():
    return StoryCategoriesService(StoryCategoriesRepository)


def story_votes_service():
    return StoryVotesService(StoryVotesRepository)


def story_comments_service():
    return StoryCommentsService(StoryCommentsRepository)

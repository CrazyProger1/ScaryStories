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
from src.stories.serializers import Serializer


def stories_service():
    return StoriesService(StoriesRepository, Serializer)


def story_categories_service():
    return StoryCategoriesService(StoryCategoriesRepository, Serializer)


def story_votes_service():
    return StoryVotesService(StoryVotesRepository, Serializer)


def story_comments_service():
    return StoryCommentsService(StoryCommentsRepository, Serializer)

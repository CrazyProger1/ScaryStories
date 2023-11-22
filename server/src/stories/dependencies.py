from functools import cache

from src.stories.repositories import (
    StoriesRepository,
    StoryCategoriesRepository,
    StoryVotesRepository,
    StoryCommentsRepository
)
from src.stories.services import (
    StoriesService,
    CategoriesService,
    VotesService,
    CommentsService
)
from src.stories.serializers import Serializer


@cache
def stories_service():
    return StoriesService(StoriesRepository, Serializer, StoryCategoriesRepository)


@cache
def story_categories_service():
    return CategoriesService(StoryCategoriesRepository, Serializer)


@cache
def story_votes_service():
    return VotesService(StoryVotesRepository, Serializer)


@cache
def story_comments_service():
    return CommentsService(StoryCommentsRepository, Serializer)

from fastapi import APIRouter, Depends

from src.auth.models import User
from src.auth.auth import current_active_user, current_superuser
from src.stories.dependencies import (
    stories_service,
    story_categories_service,
    story_votes_service,
    story_comments_service
)
from src.stories.services import (
    StoriesService,
    StoryCategoriesService,
    StoryVotesService,
    StoryCommentsService
)
from src.stories.schemas import (
    StoryCreateSchema,
    StoriesReadSchema,
    StoryCategorySchema,
    StoryRatingVoteReadSchema,
    StoryRatingVoteWriteSchema,
    StoryCommentWriteSchema,
    StoryCommentReadSchema,
    StoryRating
)

router = APIRouter()

routers = (
    router,
)


@router.get('', response_model=list[StoriesReadSchema])
async def read_stories(
        service: StoriesService = Depends(stories_service),
        limit: int = None,
        offset: int = None
):
    return await service.read_stories(limit=limit, offset=offset)


@router.post('', response_model=StoriesReadSchema)
async def create_story(
        story: StoryCreateSchema,
        user: User = Depends(current_active_user),
        service: StoriesService = Depends(stories_service)
):
    return await service.create_story(story=story, creator=user)


@router.get('/categories', response_model=list[StoryCategorySchema])
async def read_categories(service: StoryCategoriesService = Depends(story_categories_service)):
    return await service.read_categories()


@router.post('/categories', response_model=StoryCategorySchema)
async def create_category(
        category: StoryCategorySchema,
        service: StoryCategoriesService = Depends(story_categories_service),
        user: User = Depends(current_superuser)
):
    return await service.create_category(category=category)


@router.get('/{story_id}/votes', response_model=StoryRating)
async def get_rating(story_id: int, service: StoryVotesService = Depends(story_votes_service)):
    return await service.get_rating(story_id=story_id)


@router.post('/{story_id}/votes', response_model=StoryRatingVoteReadSchema)
async def create_vote(
        story_id: int,
        vote: StoryRatingVoteWriteSchema,
        service: StoryVotesService = Depends(story_votes_service),
        user: User = Depends(current_active_user)
):
    return await service.create_vote(vote=vote, creator=user, story_id=story_id)


@router.get('/{story_id}/comments')
async def read_comments(
        story_id: int,
        service: StoryCommentsService = Depends(story_comments_service),
        limit: int = None,
        offset: int = None
):
    return await service.read_comments(story_id=story_id, limit=limit, offset=offset)


@router.post('/{story_id}/comments', response_model=StoryCommentReadSchema)
async def create_comment(
        story_id: int,
        comment: StoryCommentWriteSchema,
        service: StoryCommentsService = Depends(story_comments_service),
        user: User = Depends(current_active_user)

):
    return await service.create_comment(comment=comment, story_id=story_id, creator=user)


@router.get('/{story_id}')
async def read_story(
        story_id: int,
        service: StoriesService = Depends(stories_service)
):
    return await service.read_story(story_id=story_id)

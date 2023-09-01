from fastapi import APIRouter, Depends, Response

from src.auth.auth import current_active_user, current_superuser
from src.auth.models import User
from src.stories.dependencies import (
    stories_service,
    story_categories_service,
    story_votes_service,
    story_comments_service
)
from src.stories.schemas import (
    StoryCreateSchema,
    StoriesReadSchema,
    CategorySchema,
    VoteReadSchema,
    VoteWriteSchema,
    CommentWriteSchema,
    CommentReadSchema,
    Rating,
    StoryUpdateSchema, StoryReadSchema, CommentUpdateSchema, VoteUpdateSchema
)
from src.stories.services import (
    StoriesService,
    CategoriesService,
    VotesService,
    CommentsService
)

router = APIRouter()

routers = (
    router,
)


@router.get('', response_model=list[StoriesReadSchema], tags=['Stories'])
async def read_stories(
        service: StoriesService = Depends(stories_service),
        limit: int = None,
        offset: int = None
):
    return await service.read_stories(limit=limit, offset=offset)


@router.post('', response_model=StoriesReadSchema, tags=['Stories'])
async def create_story(
        story: StoryCreateSchema,
        user: User = Depends(current_active_user),
        service: StoriesService = Depends(stories_service)
):
    return await service.create_story(story=story, creator=user)


@router.get('/categories', response_model=list[CategorySchema], tags=['Categories'])
async def read_categories(service: CategoriesService = Depends(story_categories_service)):
    return await service.read_categories()


@router.post('/categories', response_model=CategorySchema, tags=['Categories'])
async def create_category(
        category: CategorySchema,
        service: CategoriesService = Depends(story_categories_service),
        user: User = Depends(current_superuser)
):
    return await service.create_category(category=category)


@router.put('/categories/{name}', response_model=CategorySchema, tags=['Categories'])
async def update_category(
        name: str,
        category: CategorySchema,
        service: CategoriesService = Depends(story_categories_service),
        user: User = Depends(current_superuser)
):
    await service.update_category(name=name, category=category)
    return Response(status_code=204)


@router.get('/{story_id}/rating', response_model=Rating, tags=['Votes'])
async def get_rating(story_id: int, service: VotesService = Depends(story_votes_service)):
    return await service.get_rating(story_id=story_id)


@router.post('/{story_id}/votes', response_model=VoteReadSchema, tags=['Votes'])
async def create_vote(
        story_id: int,
        vote: VoteWriteSchema,
        service: VotesService = Depends(story_votes_service),
        user: User = Depends(current_active_user)
):
    return await service.create_vote(vote=vote, creator=user, story_id=story_id)


@router.get('/{story_id}/votes/my', response_model=VoteReadSchema, tags=['Votes'])
async def read_my_vote(
        story_id: int,
        service: VotesService = Depends(story_votes_service),
        user: User = Depends(current_active_user)
):
    return await service.read_my_vote(story_id=story_id, user=user)


@router.get('/{story_id}/comments', tags=['Comments'])
async def read_comments(
        story_id: int,
        service: CommentsService = Depends(story_comments_service),
        limit: int = None,
        offset: int = None
):
    return await service.read_comments(story_id=story_id, limit=limit, offset=offset)


@router.post('/{story_id}/comments', response_model=CommentReadSchema, tags=['Comments'])
async def create_comment(
        story_id: int,
        comment: CommentWriteSchema,
        service: CommentsService = Depends(story_comments_service),
        user: User = Depends(current_active_user)

):
    return await service.create_comment(comment=comment, story_id=story_id, creator=user)


@router.get('/{story_id}', response_model=StoryReadSchema, tags=['Stories'])
async def read_story(
        story_id: int,
        service: StoriesService = Depends(stories_service)
):
    return await service.read_story(story_id=story_id)


@router.patch('/{story_id}', status_code=204, tags=['Stories'])
async def update_story(
        story_id: int,
        story: StoryUpdateSchema,
        service: StoriesService = Depends(stories_service),
        user: User = Depends(current_active_user)
):
    await service.update_story(story_id=story_id, story=story, user=user)
    return Response(status_code=204)


@router.delete('/{story_id}', status_code=204, tags=['Stories'])
async def delete_story(
        story_id: int,
        service: StoriesService = Depends(stories_service),
        user: User = Depends(current_active_user)
):
    await service.delete_story(story_id=story_id, user=user)
    return Response(status_code=204)


@router.delete('/categories/{name}', status_code=204, tags=['Categories'])
async def delete_category(
        name: str,
        service: CategoriesService = Depends(story_categories_service),
        user: User = Depends(current_superuser)
):
    await service.delete_category(name=name)
    return Response(status_code=204)


@router.patch('/comments/{comment_id}', status_code=204, tags=['Comments'])
async def update_comment(
        comment_id: int,
        comment: CommentUpdateSchema,
        service: CommentsService = Depends(story_comments_service),
        user: User = Depends(current_active_user)
):
    await service.update_comment(
        comment=comment,
        comment_id=comment_id,
        user=user
    )
    return Response(status_code=204)


@router.delete('/comments/{comment_id}', status_code=204, tags=['Comments'])
async def delete_comment(
        comment_id: int,
        service: CommentsService = Depends(story_comments_service),
        user: User = Depends(current_active_user)
):
    await service.delete_comment(
        comment_id=comment_id,
        user=user
    )
    return Response(status_code=204)


@router.patch('{story_id}/votes/', status_code=204, tags=['Votes'])
async def update_vote(
        story_id: int,
        vote: VoteUpdateSchema,
        service: VotesService = Depends(story_votes_service),
        user: User = Depends(current_active_user)
):
    await service.update_vote(
        story_id=story_id,
        vote=vote,
        user=user
    )

    return Response(status_code=204)


@router.delete('{story_id}/votes/', status_code=204, tags=['Votes'])
async def delete_vote(
        story_id: int,
        service: VotesService = Depends(story_votes_service),
        user: User = Depends(current_active_user)
):
    await service.delete_vote(
        story_id=story_id,
        user=user
    )

    return Response(status_code=204)

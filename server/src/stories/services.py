from typing import Iterable, List

import sqlalchemy.exc
from pydantic import BaseModel
from fastapi import HTTPException

from src.auth.models import User
from src.repository import AbstractRepository
from src.serializer import AbstractSerializer
from src.stories.schemas import (
    StoryCreateSchema,
    StoriesReadSchema,
    StoryCategorySchema,
    StoryRatingVoteWriteSchema,
    StoryRatingVoteReadSchema,
    StoryCommentWriteSchema,
    StoryCommentReadSchema,
    StoryRating,
    StoryReadSchema, StoryUpdateSchema
)
from src.stories.models import (
    StoryComment,
    StoryRatingVote,
    Story,
    StoryCategory
)


class StoriesService:
    def __init__(self, repository: type[AbstractRepository], serializer: type[AbstractSerializer]):
        self.repository = repository()
        self.serializer = serializer()

    async def read_stories(self, limit: int = None, offset: int = None) -> list[BaseModel]:
        return self.serializer.serialize_many(await self.repository.read(limit=limit, offset=offset), StoriesReadSchema)

    async def read_story(self, story_id: int):
        story = await self.repository.read_one(Story.id == story_id)

        if story:
            return self.serializer.serialize(story, StoryReadSchema)
        raise HTTPException(status_code=404, detail='Story not found')

    async def create_story(self, story: StoryCreateSchema, creator: User) -> StoriesReadSchema:
        try:
            story_id = await self.repository.create(creator_id=creator.id, **story.model_dump())
        except sqlalchemy.exc.IntegrityError:
            raise HTTPException(status_code=403, detail=f"Category '{story.category_name}' not found")
        data = {
            'id': story_id,
            'creator_id': creator.id,
            **story.model_dump()
        }
        return StoriesReadSchema.model_validate(data)

    async def _get_story_or_404(self, story_id: int) -> Story:
        story = await self.repository.read_one(Story.id == story_id)
        if not story:
            raise HTTPException(status_code=404, detail='Story not found')
        return story

    async def _check_owner_or_403(self, story: Story, owner: User):
        if story.creator_id != owner.id and not owner.is_superuser:
            raise HTTPException(status_code=403)

    async def update_story(self, story_id: int, story: StoryUpdateSchema, user: User):
        story_instance = await self._get_story_or_404(story_id=story_id)
        await self._check_owner_or_403(story=story_instance, owner=user)
        await self.repository.update(Story.id == story_id, **story.model_dump())

    async def delete_story(self, story_id: int, user: User):
        story = await self._get_story_or_404(story_id=story_id)
        await self._check_owner_or_403(story=story, owner=user)
        await self.repository.delete(Story.id == story_id)


class StoryCategoriesService:
    def __init__(self, repository: type[AbstractRepository], serializer: type[AbstractSerializer]):
        self.repository = repository()
        self.serializer = serializer()

    async def read_categories(self):
        return self.serializer.serialize_many(await self.repository.read(), StoryCategorySchema)

    async def create_category(self, category: StoryCategorySchema) -> StoryCategorySchema:
        name = await self.repository.create(**category.model_dump())
        return StoryCategorySchema(name=name)

    async def _is_superuser_or_403(self, user: User):
        if not user.is_superuser:
            raise HTTPException(status_code=403, detail="You don't have permission to perform this action")

    async def delete_category(self, name: str, user: User):
        await self._is_superuser_or_403(user)
        await self.repository.delete(StoryCategory.name == name)


class StoryVotesService:
    def __init__(self, repository: type[AbstractRepository], serializer: type[AbstractSerializer]):
        self.repository = repository()
        self.serializer = serializer()

    async def create_vote(
            self,
            vote: StoryRatingVoteWriteSchema,
            creator: User,
            story_id: int
    ) -> StoryRatingVoteReadSchema:
        data = vote.model_dump()
        try:
            await self.repository.create(returning_fields=None, **data, user_id=creator.id, story_id=story_id)
        except sqlalchemy.exc.IntegrityError:
            raise HTTPException(status_code=403, detail=f'Story {story_id} not found')

        return StoryRatingVoteReadSchema(
            **data,
            user_id=creator.id,
            story_id=story_id
        )

    async def get_rating(self, story_id: int) -> StoryRating:
        rating = 0
        count = 0
        for vote in await self.repository.read(StoryRatingVote.story_id == story_id):
            rating += vote.vote
            count += 1

        return StoryRating.model_validate({
            'story_id': story_id,
            'rating': (rating / count) if count > 0 else 0
        })


class StoryCommentsService:
    def __init__(self, repository: type[AbstractRepository], serializer: type[AbstractSerializer]):
        self.repository = repository()
        self.serializer = serializer()

    async def read_comments(self, story_id: int, limit: int = None, offset: int = None):
        return self.serializer.serialize_many(
            await self.repository.read(
                StoryComment.story_id == story_id,
                limit=limit,
                offset=offset
            ),
            StoryCommentReadSchema
        )

    async def create_comment(
            self,
            comment: StoryCommentWriteSchema,
            creator: User,
            story_id: int
    ) -> StoryCommentReadSchema:
        data = comment.model_dump()
        try:
            await self.repository.create(returning_fields=None, **data, user_id=creator.id, story_id=story_id)
        except sqlalchemy.exc.IntegrityError:
            raise HTTPException(status_code=403, detail=f'Story {story_id} not found')

        return StoryCommentReadSchema(
            **data,
            user_id=creator.id,
            story_id=story_id
        )

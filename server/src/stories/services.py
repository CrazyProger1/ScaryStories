from typing import Iterable, List

import sqlalchemy.exc
from pydantic import BaseModel
from fastapi import HTTPException

from src.auth.models import User
from src.repository import AbstractRepository
from src.serializer import AbstractSerializer
from src.stories.schemas import (
    StoryCreateSchema,
    StoryReadSchema,
    StoryCategorySchema,
    StoryRatingVoteWriteSchema,
    StoryRatingVoteReadSchema,
    StoryCommentWriteSchema,
    StoryCommentReadSchema,
    StoryRating
)
from src.stories.models import StoryComment, StoryRatingVote


class StoriesService:
    def __init__(self, repository: type[AbstractRepository], serializer: type[AbstractSerializer]):
        self.repository = repository()
        self.serializer = serializer()

    async def read_stories(self, limit: int = None, offset: int = None) -> list[BaseModel]:
        return self.serializer.serialize_many(await self.repository.read(limit=limit, offset=offset), StoryReadSchema)

    async def create_story(self, story: StoryCreateSchema, creator: User) -> StoryReadSchema:
        try:
            story_id = await self.repository.create(creator_id=creator.id, **story.model_dump())
        except sqlalchemy.exc.IntegrityError:
            raise HTTPException(status_code=403, detail=f"Category '{story.category_name}' does not exists")
        data = {
            'id': story_id,
            'creator_id': creator.id,
            **story.model_dump()
        }
        return StoryReadSchema.model_validate(data)


class StoryCategoriesService:
    def __init__(self, repository: type[AbstractRepository], serializer: type[AbstractSerializer]):
        self.repository = repository()
        self.serializer = serializer()

    async def read_categories(self):
        return self.serializer.serialize_many(await self.repository.read(), StoryCategorySchema)

    async def create_category(self, category: StoryCategorySchema) -> StoryCategorySchema:
        name = await self.repository.create(**category.model_dump())
        return StoryCategorySchema(name=name)


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
        await self.repository.create(returning_fields=None, **data, user_id=creator.id, story_id=story_id)
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
            'rating': rating / count
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
        await self.repository.create(returning_fields=None, **data, user_id=creator.id, story_id=story_id)
        return StoryCommentReadSchema(
            **data,
            user_id=creator.id,
            story_id=story_id
        )

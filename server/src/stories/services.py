from typing import Iterable

from src.auth.models import User
from src.repository import AbstractRepository
from src.stories.schemas import (
    StoryCreateSchema,
    StoryReadSchema,
    StoryCategorySchema,
    StoryRatingVoteWriteSchema,
    StoryRatingVoteReadSchema,
    StoryCommentWriteSchema,
    StoryCommentReadSchema
)


class StoriesService:
    def __init__(self, repository: type[AbstractRepository]):
        self.repository = repository()

    async def create_story(self, story: StoryCreateSchema, creator: User) -> StoryReadSchema:
        story_id = await self.repository.create(creator_id=creator.id, **story.model_dump())

        data = {
            'id': story_id,
            'creator_id': creator.id,
            **story.model_dump()
        }
        return StoryReadSchema.model_validate(data)

    async def read_stories(self, limit: int = None, offset: int = None) -> Iterable[StoryReadSchema]:
        result = []
        for story in await self.repository.read(limit=limit, offset=offset):
            result.append(
                StoryReadSchema.model_validate(
                    story.__dict__
                )
            )

        return result


class StoryCategoriesService:
    def __init__(self, repository: type[AbstractRepository]):
        self.repository = repository()

    async def create_category(self, category: StoryCategorySchema) -> StoryCategorySchema:
        name = await self.repository.create(**category.model_dump())
        return StoryCategorySchema(name=name)

    async def read_categories(self):
        result = []

        for category in await self.repository.read():
            result.append(
                StoryCategorySchema.model_validate(
                    category.__dict__
                )
            )

        return result


class StoryVotesService:
    def __init__(self, repository: type[AbstractRepository]):
        self.repository = repository()

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


class StoryCommentsService:
    def __init__(self, repository: type[AbstractRepository]):
        self.repository = repository()

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

    async def read_comments(self):
        result = []

        for comment in await self.repository.read():
            result.append(
                StoryCommentReadSchema.model_validate(
                    comment.__dict__
                )
            )

        return result

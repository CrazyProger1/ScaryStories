from typing import Iterable

from src.repository import AbstractRepository
from src.stories.schemas import StoryCreateSchema, StoryReadSchema, StoryCategorySchema, StoryRatingVoteSchema
from src.auth.models import User


class StoriesService:
    def __init__(self, repository: type[AbstractRepository]):
        self.repository = repository()

    async def create_story(self, story: StoryCreateSchema, creator: User) -> StoryReadSchema:
        story_id = await self.repository.create(creator_id=creator.id, **story.model_dump())
        print(story_id)
        data = {
            'id': story_id,
            'creator_id': creator.id,
            **story.model_dump()
        }
        return StoryReadSchema.model_validate(data)

    async def read_stories(self, limit: int = None, offset: int = None) -> Iterable[StoryReadSchema]:
        result = []

        data = await self.repository.read(limit=limit, offset=offset)
        for row in data:
            story = row[0]

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
        data = await self.repository.read()

        for row in data:
            story = row[0]

            result.append(
                StoryCategorySchema.model_validate(
                    story.__dict__
                )
            )

        return result


class StoryVotesService:
    def __init__(self, repository: type[AbstractRepository]):
        self.repository = repository()

    async def create_vote(self, vote: StoryRatingVoteSchema) -> StoryRatingVoteSchema:
        pass

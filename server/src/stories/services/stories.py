import datetime

from fastapi import HTTPException

from src.repository import AbstractRepository
from src.serializer import AbstractSerializer
from src.stories.schemas import StoryCreateSchema, StoryReadSchema, StoriesReadSchema, StoryUpdateSchema
from src.auth.schemas import UserReadSchema
from src.auth.models import User
from src.auth.services import UsersService
from src.stories.utils.count import get_read_time_min
from src.stories.models import Story
from .categories import CategoriesService


class StoriesService:
    def __init__(
            self,
            stories_repository: AbstractRepository,
            stories_serializer: AbstractSerializer,
            users_serializer: AbstractSerializer,
            users_service: UsersService,
            categories_service: CategoriesService
    ):
        self.stories_repository = stories_repository
        self.stories_serializer = stories_serializer
        self.users_serializer = users_serializer
        self.categories_service = categories_service
        self.users_service = users_service

    async def read_stories(self, limit: int = None, offset: int = None):
        results = []
        for story in await self.stories_repository.read(limit=limit, offset=offset):
            results.append(StoriesReadSchema(
                **story.__dict__,
                rating=0,
                read_time=get_read_time_min(story.story),
                comments_number=0,
                author=await self.users_service.read_user(story.author_id),
                category=await self.categories_service.read_category(story.category_id)
            ))

        return results

    async def read_story(self, story_id: int):
        story = await self.stories_repository.read_one(Story.id == story_id)
        return StoryReadSchema(
            **story.__dict__,
            rating=0,
            read_time=get_read_time_min(story.story),
            comments_number=0,
            author=await self.users_service.read_user(story.author_id),
            category=await self.categories_service.read_category(story.category_id)
        )

    async def create_story(self, story: StoryCreateSchema, user: User):
        data = story.model_dump()
        story_id = await self.stories_repository.create(
            **data,
            author_id=user.id,
        )

        return StoryReadSchema(
            **data,
            id=story_id,
            rating=0,
            read_time=get_read_time_min(story.story),
            views=0,
            create_date=datetime.datetime.utcnow(),
            comments_number=0,
            author=self.users_serializer.serialize(user, UserReadSchema),
            category=await self.categories_service.read_category(story.category_id)
        )

    async def update_story(self, story_id: int, story: StoryUpdateSchema, user: User):
        await self.stories_repository.update(Story.id == story_id, **story.model_dump())

    async def delete_story(self, story_id: int, user: User):
        await self.stories_repository.delete(Story.id == story_id)

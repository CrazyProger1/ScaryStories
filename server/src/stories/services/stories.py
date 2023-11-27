import datetime

from fastapi import HTTPException

from src.serializer import AbstractSerializer
from src.stories.schemas import StoryCreateSchema, StoryReadSchema, StoriesReadSchema, StoryUpdateSchema
from src.auth.schemas import UserReadSchema
from src.auth.models import User
from src.auth.services import UsersService
from src.stories.utils.count import get_read_time_min
from src.stories.models import Story
from src.stories.repositories import StoriesRepository
from .categories import CategoriesService
from .enums import ErrorMessages


class StoriesService:
    def __init__(
            self,
            stories_repository: StoriesRepository,
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

    async def _increase_views(self, story: Story):
        await self.stories_repository.update(Story.id == story.id, views=story.views + 1)

    async def _get_story_or_404(self, story_id: int) -> Story:
        story = await self.stories_repository.read_one(Story.id == story_id)
        if not story:
            raise HTTPException(status_code=404, detail=ErrorMessages.NOT_FOUND)
        return story

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
        story = await self._get_story_or_404(story_id=story_id)
        await self._increase_views(story)
        return StoryReadSchema(
            **story.__dict__,
            rating=0,
            read_time=get_read_time_min(story.story),
            comments_number=0,
            author=await self.users_service.read_user(story.author_id),
            category=await self.categories_service.read_category(story.category_id)
        )

    async def read_random_story(self):
        story = await self.stories_repository.get_random_story()
        await self._increase_views(story)
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

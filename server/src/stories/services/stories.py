from src.repository import AbstractRepository
from src.serializer import AbstractSerializer
from src.stories.schemas import StoryCreateSchema


class StoriesService:
    def __init__(self, stories_repository: type[AbstractRepository], stories_serializer: type[AbstractSerializer]):
        self.stories_repository = stories_repository()
        self.stories_serializer = stories_serializer()

    async def read_stories(self, limit: int = None, offset: int = None):
        for story in await self.stories_repository.read(limit=limit, offset=offset):
            print(story)

    async def create_story(self, story: StoryCreateSchema):
        print(story)

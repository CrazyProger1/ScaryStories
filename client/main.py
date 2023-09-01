import aiohttp
import asyncio
from pydantic import BaseModel
from typing import AsyncGenerator
from enum import Enum
from urllib.parse import urljoin


class Method(Enum):
    CREATE = 0
    READ = 1
    UPDATE = 2
    DELETE = 3
    COMMON = 4


class Story(BaseModel):
    id: int
    name: str
    story: str
    creator_id: int
    category_name: str


class StoryComment(BaseModel):
    story_id: int
    user_id: int
    comment: str


class Serializer:
    model: type[BaseModel]

    @classmethod
    def serialize(cls, obj: BaseModel) -> dict:
        return obj.model_dump()

    @classmethod
    def deserialize(cls, data: dict) -> BaseModel:
        return cls.model.model_validate(data)


class StorySerializer(Serializer):
    model = Story


class StoryCommentSerializer(Serializer):
    model = StoryComment


class APIManager:
    serializer: type[Serializer]
    routes: dict[Method, str]
    base_url: str = 'http://127.0.0.1:8000'

    async def read(self, url: str = None, url_subst: dict = None) -> AsyncGenerator[BaseModel, None]:
        raise NotImplementedError

    async def create(self, obj: BaseModel, url: str = None, url_subst: dict = None):
        raise NotImplementedError


class AihttpAPIManager(APIManager):

    def _get_url(self, method: Method, default: str, formatting: dict = None):
        url = default or urljoin(self.base_url, self.routes.get(method, self.routes.get(Method.COMMON)))

        if formatting:
            return url.format(**formatting)

        return url

    async def read(self, url: str = None, url_subst: dict = None) -> AsyncGenerator[BaseModel, None]:
        url = self._get_url(Method.READ, url, url_subst)

        async with aiohttp.ClientSession() as session:
            response = await session.get(url)
            data = await response.json()
            for dataset in data:
                yield self.serializer.deserialize(dataset)

    async def create(self, obj: BaseModel, url: str = None, url_subst: dict = None) -> BaseModel:
        if not url_subst:
            url_subst = {}

        data = self.serializer.serialize(obj)

        url_subst.update(data)

        url = self._get_url(Method.CREATE, url, url_subst)

        async with aiohttp.ClientSession() as session:
            response = await session.post(url, data=self.serializer.serialize(obj))
            data = await response.json()
            if response.status == 201:
                return self.serializer.deserialize(data)
            raise


class StoryAPIManager(AihttpAPIManager):
    serializer = StorySerializer
    routes = {
        Method.COMMON: 'stories/'
    }


class StoryCommentAPIManager(AihttpAPIManager):
    serializer = StoryCommentSerializer
    routes = {
        Method.COMMON: 'stories/{story_id}/comments/'
    }


async def main():
    manager = StoryAPIManager()
    comment_manager = StoryCommentAPIManager()

    await comment_manager.create(
        StoryComment(
            story_id=1,
            user_id=1,
            comment='Hello, world!'
        )
    )

    async for story in manager.read():
        print(story.id, story.story, story.name)

    async for comment in comment_manager.read(url_subst={'story_id': 3}):
        print(comment.comment, comment.story_id)


asyncio.run(main())

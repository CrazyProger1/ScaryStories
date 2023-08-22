from sqlalchemy import select, insert
from sqlalchemy.ext.asyncio import AsyncSession

from stories.schemas import StoryCreateSchema
from stories.models import story
from database import get_async_session


async def get_all_stories(session: AsyncSession):
    query = select(story)
    result = await session.execute(query)
    return result.all()


async def create_story(session: AsyncSession, story_: StoryCreateSchema):
    print(story_)
    # query = insert(story).values()
    # result = await session.execute(query)
    # return result.first()

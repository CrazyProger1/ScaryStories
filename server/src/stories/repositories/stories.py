from sqlalchemy import func, select

from src.repository import SQLAlchemyRepository
from src.stories.models import Story
from src.database import async_session_maker


class StoriesRepository(SQLAlchemyRepository):
    model = Story

    async def get_random_story(self) -> Story:
        async with async_session_maker() as session:
            statement = select(self.model).order_by(func.random()).limit(1)
            result = await session.execute(statement)
            random_story = result.scalar_one_or_none()
            return random_story

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

    async def count_author_views(self, author_id: int) -> int:
        async with async_session_maker() as session:
            query = select(func.sum(Story.views)).select_from(self.model)
            query = query.filter(Story.author_id == author_id)
            result = await session.execute(query)
            return result.scalar() or 0

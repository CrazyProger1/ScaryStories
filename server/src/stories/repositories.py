from sqlalchemy import insert
from src.database import async_session_maker

from src.repository import SQLAlchemyRepository
from src.stories.models import Story, StoryCategory


class StoriesRepository(SQLAlchemyRepository):
    model = Story


class StoryCategoriesRepository(SQLAlchemyRepository):
    model = StoryCategory

    async def create(self, **data):
        async with async_session_maker() as session:
            stmt = insert(self.model).values(**data).returning(self.model.name)
            result = await session.execute(stmt)
            await session.commit()
            return result.scalar_one()


class StoryVotesRepository(SQLAlchemyRepository):
    model = StoryCategory

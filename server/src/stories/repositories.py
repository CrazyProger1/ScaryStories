from src.repository import SQLAlchemyRepository
from src.stories.models import Story


class StoriesRepository(SQLAlchemyRepository):
    model = Story

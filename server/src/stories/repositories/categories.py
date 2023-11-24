from src.repository import SQLAlchemyRepository
from src.stories.models import StoryCategory


class CategoriesRepository(SQLAlchemyRepository):
    model = StoryCategory

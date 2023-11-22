from src.repository import SQLAlchemyRepository
from src.stories.models import StoryCategory


class CategoryRepository(SQLAlchemyRepository):
    model = StoryCategory

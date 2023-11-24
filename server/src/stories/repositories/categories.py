from src.repository import SQLAlchemyRepository
from src.stories.models import Category


class CategoriesRepository(SQLAlchemyRepository):
    model = Category

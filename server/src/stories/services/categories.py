from src.repository import AbstractRepository
from src.serializer import AbstractSerializer
from src.stories.schemas import CategoryReadSchema


class CategoryService:
    def __init__(self, category_repository: AbstractRepository, category_serializer: AbstractSerializer):
        self.category_repository = category_repository
        self.category_serializer = category_serializer

    async def read_categories(self):
        return self.category_serializer.serialize_many(await self.category_repository.read(), CategoryReadSchema)

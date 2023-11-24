from src.repository import AbstractRepository
from src.serializer import AbstractSerializer
from src.stories.schemas import CategoryReadSchema, CategoryCreateUpdateSchema
from src.stories.models import StoryCategory


class CategoryService:
    def __init__(self, category_repository: AbstractRepository, category_serializer: AbstractSerializer):
        self.category_repository = category_repository
        self.category_serializer = category_serializer

    async def read_categories(self, limit: int = None, offset: int = None):
        return self.category_serializer.serialize_many(
            await self.category_repository.read(limit=limit, offset=offset),
            CategoryReadSchema
        )

    async def read_category(self, category_id: int):
        return self.category_serializer.serialize(
            await self.category_repository.read_one(StoryCategory.id == category_id),
            CategoryReadSchema
        )

    async def create_category(self, category: CategoryCreateUpdateSchema):
        category_id = await self.category_repository.create(**category.model_dump())
        return CategoryReadSchema(name=category.name, id=category_id)

    async def update_category(self, category_id: int, category: CategoryCreateUpdateSchema) -> None:
        await self.category_repository.update(StoryCategory.id == category_id, **category.model_dump())

    async def delete_category(self, category_id: int) -> None:
        await self.category_repository.delete(StoryCategory.id == category_id)

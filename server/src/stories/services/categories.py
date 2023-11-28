import sqlalchemy.exc
from fastapi import HTTPException

from src.repository import AbstractRepository
from src.serializer import AbstractSerializer
from src.stories.schemas import CategoryReadSchema, CategoryCreateUpdateSchema
from src.stories.models import Category
from .enums import ErrorMessages
from ...pagination.paginators import Paginator


class CategoriesService:
    def __init__(self, category_repository: AbstractRepository, category_serializer: AbstractSerializer):
        self.category_repository = category_repository
        self.category_serializer = category_serializer

    async def get_category_or_404(self, category_id: int) -> Category:
        category = await self.category_repository.read_one(Category.id == category_id)
        if not category:
            raise HTTPException(status_code=404, detail=ErrorMessages.CATEGORY_NOT_FOUND)
        return category

    async def name_is_unique_or_403(self, name: str):
        category = await self.category_repository.read_one(Category.name == name)
        if category:
            raise HTTPException(status_code=403, detail=ErrorMessages.CATEGORY_WITH_NAME_ALREADY_EXISTS)

    async def read_categories(self, pagination_params: Paginator):
        return self.category_serializer.serialize_many(
            await self.category_repository.read(limit=pagination_params.limit, offset=pagination_params.offset),
            CategoryReadSchema
        )

    async def read_category(self, category_id: int):
        return self.category_serializer.serialize(
            await self.get_category_or_404(category_id=category_id),
            CategoryReadSchema
        )

    async def create_category(self, category: CategoryCreateUpdateSchema):
        await self.name_is_unique_or_403(category.name)
        category_id = await self.category_repository.create(**category.model_dump())
        return CategoryReadSchema(name=category.name, id=category_id)

    async def update_category(self, category_id: int, category: CategoryCreateUpdateSchema) -> None:
        await self.get_category_or_404(category_id=category_id)
        await self.name_is_unique_or_403(category.name)
        await self.category_repository.update(Category.id == category_id, **category.model_dump())

    async def delete_category(self, category_id: int) -> None:
        await self.get_category_or_404(category_id=category_id)
        try:
            await self.category_repository.delete(Category.id == category_id)
        except sqlalchemy.exc.IntegrityError:
            raise HTTPException(403, ErrorMessages.CATEGORY_IN_USE)

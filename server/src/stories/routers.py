from fastapi import APIRouter, Depends, Response

from src.pagination import DefaultPaginatedResponseSchema, DefaultPaginator
from src.auth.models import User
from src.auth.auth import current_superuser, current_active_user
from .services import CategoryService
from .dependencies import story_categories_service
from .schemas import CategoryReadSchema, CategoryCreateUpdateSchema

router = APIRouter()

routers = (
    router,
)


@router.get('/categories', response_model=DefaultPaginatedResponseSchema, tags=['Categories'])
async def read_categories(
        service: CategoryService = Depends(story_categories_service),
        paginator: DefaultPaginator = Depends(DefaultPaginator)
):
    results = await service.read_categories(limit=paginator.limit, offset=paginator.offset)
    return paginator.form_response(results=results, total=len(results))


@router.get('/categories/{category_id}', response_model=CategoryReadSchema, tags=['Categories'])
async def read_category(
        category_id: int,
        service: CategoryService = Depends(story_categories_service)
):
    return await service.read_category(category_id=category_id)


@router.post('/categories', response_model=CategoryReadSchema, tags=['Categories'])
async def create_category(
        category: CategoryCreateUpdateSchema,
        service: CategoryService = Depends(story_categories_service),
        user: User = Depends(current_superuser)
):
    return await service.create_category(category=category)


@router.put('/categories/{category_id}', status_code=204, tags=['Categories'])
async def update_category(
        category_id: int,
        category: CategoryCreateUpdateSchema,
        service: CategoryService = Depends(story_categories_service),
        user: User = Depends(current_superuser)
):
    await service.update_category(category_id=category_id, category=category)
    return Response(status_code=204)


@router.delete('/categories/{category_id}', status_code=204, tags=['Categories'])
async def delete_category(
        category_id: int,
        service: CategoryService = Depends(story_categories_service),
        user: User = Depends(current_superuser)
):
    await service.delete_category(category_id=category_id)
    return Response(status_code=204)

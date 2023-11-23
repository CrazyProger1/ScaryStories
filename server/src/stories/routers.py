from fastapi import APIRouter, Depends

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


@router.post('/categories', response_model=CategoryReadSchema, tags=['Categories'])
async def create_category(
        category: CategoryCreateUpdateSchema,
        service: CategoryService = Depends(story_categories_service),
        user: User = Depends(current_superuser)
):
    return await service.create_category(category=category)

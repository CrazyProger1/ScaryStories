from fastapi import APIRouter, Depends

from src.pagination import DefaultPaginatedResponseSchema, DefaultPaginator
from .services import CategoryService
from .dependencies import story_categories_service

router = APIRouter()

routers = (
    router,
)


@router.get('/categories', response_model=DefaultPaginatedResponseSchema, tags=['Categories'])
async def read_categories(
        service: CategoryService = Depends(story_categories_service),
        paginator: DefaultPaginator = Depends(DefaultPaginator)
):
    results = await service.read_categories()
    return paginator.form_response(results=results)

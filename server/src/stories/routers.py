from fastapi import APIRouter, Depends

from .schemas import CategoryReadSchema
from .services import CategoryService, story_categories_service

router = APIRouter()

routers = (
    router,
)


@router.get('/categories', response_model=list[CategoryReadSchema], tags=['Categories'])
async def read_categories(
        service: CategoryService = Depends(story_categories_service)
):
    return service.read_categories()

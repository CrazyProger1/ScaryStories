from fastapi import APIRouter, Depends, Response

from src.pagination import DefaultPaginator, PaginatedResponseSchema, Paginator
from src.filtering import Filter
from src.sorting import Sorter
from src.auth.models import User
from src.auth.auth import current_superuser, current_active_user
from .services import CategoriesService, StoriesService
from .dependencies import categories_service, stories_service
from .schemas import (
    CategoryReadSchema,
    CategoryCreateUpdateSchema,
    StoryReadSchema,
    StoryCreateSchema,
    StoryUpdateSchema
)
from .filters import StoryFilter
from .sorters import StorySorter

router = APIRouter()

routers = (
    router,
)


@router.get('/categories', response_model=PaginatedResponseSchema, tags=['Categories'])
async def read_categories(
        service: CategoriesService = Depends(categories_service),
        pagination_params: Paginator = Depends(DefaultPaginator)
):
    results = await service.read_categories(pagination_params=pagination_params)
    return pagination_params.form_response(results=results, total=len(results))


@router.get('/categories/{category_id}', response_model=CategoryReadSchema, tags=['Categories'])
async def read_category(
        category_id: int,
        service: CategoriesService = Depends(categories_service)
):
    return await service.read_category(category_id=category_id)


@router.post('/categories', response_model=CategoryReadSchema, status_code=201, tags=['Categories'])
async def create_category(
        category: CategoryCreateUpdateSchema,
        service: CategoriesService = Depends(categories_service),
        user: User = Depends(current_superuser)
):
    return await service.create_category(category=category)


@router.patch('/categories/{category_id}', status_code=204, tags=['Categories'])
async def update_category(
        category_id: int,
        category: CategoryCreateUpdateSchema,
        service: CategoriesService = Depends(categories_service),
        user: User = Depends(current_superuser)
):
    await service.update_category(category_id=category_id, category=category)
    return Response(status_code=204)


@router.delete('/categories/{category_id}', status_code=204, tags=['Categories'])
async def delete_category(
        category_id: int,
        service: CategoriesService = Depends(categories_service),
        user: User = Depends(current_superuser)
):
    await service.delete_category(category_id=category_id)
    return Response(status_code=204)


@router.get('', response_model=PaginatedResponseSchema, tags=['Stories'])
async def read_stories(
        service: StoriesService = Depends(stories_service),
        pagination_params: DefaultPaginator = Depends(DefaultPaginator),
        filter_params: Filter = Depends(StoryFilter),
        sort_params: Sorter = Depends(StorySorter)
):
    results = await service.read_stories(
        pagination_params=pagination_params,
        filter_params=filter_params,
        sort_params=sort_params
    )
    return pagination_params.form_response(results=results, total=0)


@router.get('/{story_id}', response_model=StoryReadSchema, tags=['Stories'])
async def read_story(
        story_id: int | str,
        service: StoriesService = Depends(stories_service)
):
    if story_id.isdigit():
        return await service.read_story(story_id=int(story_id))
    else:
        return await service.read_random_story()


@router.post('', status_code=201, response_model=StoryReadSchema, tags=['Stories'])
async def create_story(
        story: StoryCreateSchema,
        service: StoriesService = Depends(stories_service),
        user: User = Depends(current_active_user)
):
    return await service.create_story(story=story, user=user)


@router.patch('/{story_id}', status_code=204, tags=['Stories'])
async def update_story(
        story_id: int,
        story: StoryUpdateSchema,
        service: StoriesService = Depends(stories_service),
        user: User = Depends(current_active_user)
):
    await service.update_story(
        story_id=story_id,
        story=story,
        user=user
    )
    return Response(status_code=204)


@router.delete('/{story_id}', status_code=204, tags=['Stories'])
async def delete_story(
        story_id: int,
        service: StoriesService = Depends(stories_service),
        user: User = Depends(current_active_user)
):
    await service.delete_story(story_id=story_id, user=user)
    return Response(status_code=204)

from fastapi import APIRouter, Depends
from src.auth.models import User
from src.auth.auth import current_active_user, current_superuser
from src.stories.dependencies import stories_service, story_categories_service
from src.stories.services import StoriesService, StoryCategoriesService
from src.stories.schemas import StoryCreateSchema, StoryReadSchema, StoryCategorySchema

router = APIRouter()

routers = (
    router,
)


@router.get('', response_model=list[StoryReadSchema])
async def read_stories(service: StoriesService = Depends(stories_service)):
    return await service.read_stories()


@router.post('', response_model=StoryReadSchema)
async def create_story(
        story: StoryCreateSchema,
        user: User = Depends(current_active_user),
        service: StoriesService = Depends(stories_service)
):
    return await service.create_story(story=story, creator=user)


@router.get('/categories', response_model=list[StoryCategorySchema])
async def read_categories(service: StoryCategoriesService = Depends(story_categories_service)):
    return await service.read_categories()


@router.post('/categories', response_model=StoryCategorySchema)
async def create_category(
        category: StoryCategorySchema,
        service: StoryCategoriesService = Depends(story_categories_service),
        user: User = Depends(current_superuser)
):
    return await service.create_category(category=category)

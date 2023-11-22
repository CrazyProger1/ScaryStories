from fastapi import APIRouter

from src.stories.schemas import StoriesReadSchema

router = APIRouter()

routers = (
    router,
)


@router.get('', response_model=list[StoriesReadSchema], tags=['Stories'])
async def read_stories(
        limit: int = None,
        offset: int = None
):
    pass

from fastapi import APIRouter, Depends

from .services import UsersStatisticsService
from .dependencies import users_statistics_service
from .schemas import UserStatisticsReadSchema

router = APIRouter()

routers = (
    router,
)


@router.get('/users/{user_id}', status_code=200, response_model=UserStatisticsReadSchema, tags=['Statistics'])
async def read_user_statistics(
        user_id: int,
        service: UsersStatisticsService = Depends(users_statistics_service)
):
    return await service.read_user_statistics(user_id=user_id)

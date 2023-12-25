from functools import cache
from .services import UsersStatisticsService
from src.auth.dependencies import users_service
from src.stories.dependencies import stories_service


@cache
def users_statistics_service():
    return UsersStatisticsService(users_service(), stories_service())

from src.auth.services import UsersService
from src.stories.services import StoriesService

from .schemas import UserStatisticsReadSchema


class UsersStatisticsService:
    def __init__(self, users_service: UsersService, stories_service: StoriesService):
        self.users_service = users_service
        self.stories_service = stories_service

    async def read_user_statistics(self, user_id: int):
        user = await self.users_service.get_user_or_404(user_id=user_id)
        return UserStatisticsReadSchema(
            stories_number=await self.stories_service.count_user_stories(user=user),
            views_number=await self.stories_service.count_author_views(author=user)
        )

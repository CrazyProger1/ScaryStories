from src.repository import AbstractRepository
from src.serializer import AbstractSerializer
from .models import User
from .schemas import UserReadSchema


class UsersService:
    def __init__(self, users_repository: AbstractRepository, users_serializer: AbstractSerializer):
        self.users_repository = users_repository
        self.users_serializer = users_serializer

    async def read_user(self, user_id: int):
        return self.users_serializer.serialize(
            await self.users_repository.read_one(User.id == user_id),
            UserReadSchema
        )

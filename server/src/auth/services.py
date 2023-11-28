from fastapi import HTTPException

from src.repository import AbstractRepository
from src.serializer import AbstractSerializer
from .models import User
from .schemas import UserReadSchema
from .enums import ErrorMessages


class UsersService:
    def __init__(self, users_repository: AbstractRepository, users_serializer: AbstractSerializer):
        self.users_repository = users_repository
        self.users_serializer = users_serializer

    async def get_user_or_404(self, user_id: int):
        user = await self.users_repository.read_one(User.id == user_id)
        if not user:
            raise HTTPException(status_code=404, detail=ErrorMessages.NOT_FOUND)
        return user

    async def is_superuser_or_403(self, user: User):
        if not user.is_superuser:
            raise HTTPException(status_code=403, detail=ErrorMessages.IS_NOT_SUPERUSER)

    async def read_user(self, user_id: int):
        return self.users_serializer.serialize(
            self.get_user_or_404(user_id=user_id),
            UserReadSchema
        )

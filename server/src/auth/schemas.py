import datetime

from fastapi_users import schemas
from pydantic import Field


class UserReadSchema(schemas.BaseUser[int]):
    nickname: str
    registered_at: datetime.datetime
    photo_url: str | None = Field(None)


class UserCreateSchema(schemas.BaseUserCreate):
    nickname: str
    photo_url: str | None = Field(None)


class UserUpdateSchema(schemas.BaseUserUpdate):
    nickname: str
    photo_url: str | None = Field(None)

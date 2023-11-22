import datetime

from fastapi_users import schemas


class UserReadSchema(schemas.BaseUser[int]):
    nickname: str
    registered_at: datetime.datetime


class UserCreateSchema(schemas.BaseUserCreate):
    nickname: str


class UserUpdateSchema(schemas.BaseUserUpdate):
    nickname: str

import datetime

from fastapi_users import schemas


class UserReadSchema(schemas.BaseUser[int]):
    username: str
    registered_at: datetime.datetime


class UserCreateSchema(schemas.BaseUserCreate):
    username: str


class UserUpdateSchema(schemas.BaseUserUpdate):
    username: str

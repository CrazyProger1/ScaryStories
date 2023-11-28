from src.auth.schemas import UserReadSchema, UserCreateSchema, UserUpdateSchema
from src.auth.auth import fastapi_users
from src.auth.backends import jwt_auth_backend

routers = (
    fastapi_users.get_register_router(UserReadSchema, UserCreateSchema),
    fastapi_users.get_auth_router(jwt_auth_backend),
    fastapi_users.get_users_router(UserReadSchema, UserUpdateSchema),
)

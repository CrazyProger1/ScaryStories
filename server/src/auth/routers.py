from fastapi_users import FastAPIUsers
from auth.models import User
from auth.manager import get_user_manager
from auth.backends import auth_backend
from auth.schemas import UserReadSchema, UserCreateSchema, UserUpdateSchema

fastapi_users = FastAPIUsers[User, int](
    get_user_manager,
    [auth_backend],
)

register_router = fastapi_users.get_register_router(UserReadSchema, UserCreateSchema)
auth_router = fastapi_users.get_auth_router(auth_backend)
users_router = fastapi_users.get_users_router(UserReadSchema, UserUpdateSchema)

routers = (
    register_router,
    auth_router,
    users_router
)

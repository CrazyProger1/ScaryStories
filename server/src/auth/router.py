from fastapi_users import FastAPIUsers
from .models import User
from .manager import get_user_manager
from .backends import auth_backend

fastapi_users = FastAPIUsers[User, int](
    get_user_manager,
    [auth_backend],
)

router = fastapi_users.get_auth_router(auth_backend)

from fastapi_users import FastAPIUsers

from src.auth.models import User
from src.auth.manager import get_user_manager
from src.auth.backends import jwt_auth_backend

fastapi_users = FastAPIUsers[User, int](
    get_user_manager,
    [jwt_auth_backend],
)

from fastapi_users import FastAPIUsers

from src.auth.models import User
from src.auth.manager import get_user_manager
from src.auth.backends import jwt_auth_backend

fastapi_users = FastAPIUsers[User, int](
    get_user_manager,
    [jwt_auth_backend],
)

current_active_user = fastapi_users.current_user(active=True)
current_superuser = fastapi_users.current_user(superuser=True)

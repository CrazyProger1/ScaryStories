from fastapi_users.authentication import JWTStrategy
from config import settings
from auth.constants import TOKEN_LIFETIME


def get_jwt_strategy() -> JWTStrategy:
    return JWTStrategy(
        secret=settings.secret,
        lifetime_seconds=TOKEN_LIFETIME
    )

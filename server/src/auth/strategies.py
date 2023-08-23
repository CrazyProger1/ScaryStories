from fastapi_users.authentication import JWTStrategy
from src.config import settings
from src.auth.constants import JWT_TOKEN_LIFETIME


def get_jwt_strategy() -> JWTStrategy:
    return JWTStrategy(
        secret=settings.secret,
        lifetime_seconds=JWT_TOKEN_LIFETIME
    )

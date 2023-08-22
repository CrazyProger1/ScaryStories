from fastapi_users.authentication import AuthenticationBackend, BearerTransport, JWTStrategy
from config import settings
from auth.constants import TOKEN_LIFETIME

bearer_transport = BearerTransport('auth/login/')


def get_jwt_strategy() -> JWTStrategy:
    return JWTStrategy(
        secret=settings.secret,
        lifetime_seconds=TOKEN_LIFETIME
    )


auth_backend = AuthenticationBackend(
    name='jwt',
    transport=bearer_transport,
    get_strategy=get_jwt_strategy,
)

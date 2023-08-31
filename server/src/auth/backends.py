from fastapi_users.authentication import AuthenticationBackend

from src.auth.transports import bearer_transport
from src.auth.strategies import get_jwt_strategy

jwt_auth_backend = AuthenticationBackend(
    name='jwt',
    transport=bearer_transport,
    get_strategy=get_jwt_strategy,
)

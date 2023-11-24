from functools import cache

from .services import UsersService
from .serializers import UsersSerializer
from .repositories import UsersRepository


@cache
def users_service():
    return UsersService(UsersRepository(), UsersSerializer())

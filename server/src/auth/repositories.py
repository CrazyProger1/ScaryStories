from src.repository import SQLAlchemyRepository

from .models import User


class UsersRepository(SQLAlchemyRepository):
    model = User

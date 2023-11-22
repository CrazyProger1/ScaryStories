from datetime import datetime

import sqlalchemy as db
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import Depends
from fastapi_users.db import SQLAlchemyBaseUserTable
from fastapi_users_db_sqlalchemy import SQLAlchemyUserDatabase

from src.database import Base, get_async_session


class User(SQLAlchemyBaseUserTable[int], Base):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, nullable=False)
    nickname = db.Column(db.String, nullable=False)
    registered_at = db.Column(db.TIMESTAMP, default=datetime.utcnow)
    hashed_password: str = db.Column(db.String(length=1024), nullable=False)
    is_active: bool = db.Column(db.Boolean, default=True, nullable=False)
    is_superuser: bool = db.Column(db.Boolean, default=False, nullable=False)
    is_verified: bool = db.Column(db.Boolean, default=False, nullable=False)


async def get_user_db(session: AsyncSession = Depends(get_async_session)):
    yield SQLAlchemyUserDatabase(session, User)

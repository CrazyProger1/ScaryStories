from datetime import datetime
from typing import AsyncGenerator

import sqlalchemy as db
from fastapi import Depends
from fastapi_users.db import SQLAlchemyBaseUserTable, SQLAlchemyUserDatabase
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeMeta, declarative_base

from src.config import settings

metadata = db.MetaData()

Base: DeclarativeMeta = declarative_base()
# metadata = Base.metadata


class User(SQLAlchemyBaseUserTable[int], Base):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, nullable=False)
    username = db.Column(db.String, nullable=False)
    registered_at = db.Column(db.TIMESTAMP, default=datetime.utcnow)
    hashed_password: str = db.Column(db.String(length=1024), nullable=False)
    is_active: bool = db.Column(db.Boolean, default=True, nullable=False)
    is_superuser: bool = db.Column(db.Boolean, default=False, nullable=False)
    is_verified: bool = db.Column(db.Boolean, default=False, nullable=False)


user = db.Table(
    'user',
    metadata,
    db.Column('id', db.Integer, primary_key=True),
    db.Column('email', db.String, nullable=False),
    db.Column('username', db.String, nullable=False),
    db.Column('registered_at', db.TIMESTAMP, default=datetime.utcnow),
    db.Column('hashed_password', db.String, nullable=False),
    db.Column('is_active', db.Boolean, default=True, nullable=False),
    db.Column('is_superuser', db.Boolean, default=False, nullable=False),
    db.Column('is_verified', db.Boolean, default=False, nullable=False),
)

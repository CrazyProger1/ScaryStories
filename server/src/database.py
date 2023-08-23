from typing import AsyncGenerator

from sqlalchemy import MetaData
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, AsyncSession
from sqlalchemy.orm import declarative_base

from src.config import settings

engine = create_async_engine(settings.database_uri)
async_session_maker = async_sessionmaker(engine, expire_on_commit=False)

metadata = MetaData()
Base = declarative_base(metadata=metadata)


async def get_async_session() -> AsyncGenerator[AsyncSession, None]:
    async with async_session_maker() as session:
        yield session

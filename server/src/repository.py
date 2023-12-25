from abc import ABC, abstractmethod
from typing import Iterable

from sqlalchemy import insert, select, delete, update, func

from src.database import async_session_maker, Base


class AbstractRepository(ABC):
    @abstractmethod
    async def create(self, returning_fields: tuple[str] | None = ('id',), **data): ...

    @abstractmethod
    async def read(self, *filters, limit: int = None, offset: int = None): ...

    @abstractmethod
    async def read_one(self, *filters): ...

    @abstractmethod
    async def update(self, *filters, **data) -> None: ...

    @abstractmethod
    async def delete(self, *filters) -> None: ...

    @abstractmethod
    async def exists(self, *filters) -> bool: ...

    @abstractmethod
    async def count(self, *filters) -> int: ...


class SQLAlchemyRepository(AbstractRepository):
    model: type[Base] = None

    async def create(self, returning_fields: tuple[str] = ('id',), **data):
        async with async_session_maker() as session:
            stmt = insert(self.model).values(**data)

            if returning_fields:
                stmt = stmt.returning(
                    *(getattr(self.model, field) for field in returning_fields)
                )
            result = await session.execute(stmt)
            await session.commit()

            if returning_fields:
                return result.scalar_one()
            # return result.scalars().all()

    async def _read(self, *filters, limit: int = None, offset: int = None, sorts: list = None):
        async with async_session_maker() as session:
            query = select(self.model)

            if limit:
                query = query.limit(limit)

            if offset:
                query = query.offset(offset)

            if filters:
                query = query.filter(*filters)

            if isinstance(sorts, Iterable):
                query = query.order_by(*sorts)

            result = await session.execute(query)
            return result

    async def read(self, *filters, limit: int = None, offset: int = None, sorts: list = None) -> list:
        result = await self._read(*filters, limit=limit, offset=offset, sorts=sorts)
        return result.scalars().all()

    async def read_one(self, *filters):
        result = await self._read(*filters)
        return result.scalars().first()

    async def update(self, *filters, **data):
        async with async_session_maker() as session:
            stmt = update(self.model).filter(*filters).values(**data)
            await session.execute(stmt)
            await session.commit()

    async def delete(self, *filters):
        async with async_session_maker() as session:
            stmt = delete(self.model).filter(*filters)
            await session.execute(stmt)
            await session.commit()

    async def exists(self, *filters) -> bool:
        result = await self._read(*filters)
        return result.first() is not None

    async def count(self, *filters) -> int:
        async with async_session_maker() as session:
            query = select(func.count()).select_from(self.model)

            if filters:
                query = query.filter(*filters)

            result = await session.execute(query)
            return result.scalar()

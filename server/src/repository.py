from abc import ABC, abstractmethod

from sqlalchemy import insert, select

from src.database import async_session_maker, Base


class AbstractRepository(ABC):
    @abstractmethod
    async def create(self, returning_fields: tuple[str] | None = ('id',), **data): ...

    @abstractmethod
    async def read(self, limit: int = None, offset: int = None): ...

    @abstractmethod
    async def update(self): ...

    @abstractmethod
    async def delete(self): ...


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

    async def read(self, limit: int = None, offset: int = None) -> list:
        async with async_session_maker() as session:
            query = select(self.model)

            if limit:
                query = query.limit(limit)

            if offset:
                query = query.offset(offset)

            result = await session.execute(query)
            return result.scalars().all()

    async def update(self):
        pass

    async def delete(self):
        pass
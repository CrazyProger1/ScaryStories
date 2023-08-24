from abc import ABC, abstractmethod

from sqlalchemy import insert, select

from src.database import async_session_maker, Base


class AbstractRepository(ABC):
    @abstractmethod
    async def create(self, **data): ...

    @abstractmethod
    async def read(self): ...

    @abstractmethod
    async def update(self): ...

    @abstractmethod
    async def delete(self): ...


class SQLAlchemyRepository(AbstractRepository):
    model: type[Base] = None

    async def create(self, **data) -> int:
        async with async_session_maker() as session:
            stmt = insert(self.model).values(**data).returning(self.model.id)
            result = await session.execute(stmt)
            await session.commit()
            return result.scalar_one()

    async def read(self) -> list:
        async with async_session_maker() as session:
            query = select(self.model)
            result = await session.execute(query)
            return result.all()

    async def update(self):
        pass

    async def delete(self):
        pass

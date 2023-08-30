from abc import ABC, abstractmethod
from typing import Iterable

from pydantic import BaseModel

from src.database import Base


class AbstractSerializer(ABC):
    schema: type[BaseModel]
    model: type[Base]

    @abstractmethod
    def serialize(self, obj: Base): ...

    @abstractmethod
    def deserialize(self, schema: BaseModel): ...


class Serializer(AbstractSerializer):
    def serialize(self, obj: Base | Iterable[Base]):
        pass

    def deserialize(self, schema: BaseModel):
        pass

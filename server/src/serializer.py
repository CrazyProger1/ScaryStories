from abc import ABC, abstractmethod
from typing import Iterable

from pydantic import BaseModel

from src.database import Base


class AbstractSerializer(ABC):

    @abstractmethod
    def to_dict(self, obj: Base) -> dict: ...

    @abstractmethod
    def serialize(self, obj: Base, schema: type[BaseModel]) -> BaseModel: ...

    @abstractmethod
    def serialize_many(self, objects: Iterable[Base], schema: type[BaseModel]) -> list[BaseModel]: ...


class Serializer(AbstractSerializer):
    def to_dict(self, obj: Base) -> dict:
        return obj.__dict__

    def serialize(self, obj: Base, schema: type[BaseModel]) -> BaseModel:
        return schema.model_validate(self.to_dict(obj))

    def serialize_many(self, objects: Iterable[Base], schema: type[BaseModel]) -> list[BaseModel]:
        result = []
        for obj in objects:
            result.append(self.serialize(obj, schema))

        return result

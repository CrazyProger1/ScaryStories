from abc import ABC, abstractmethod
from typing import Iterable

from pydantic import BaseModel

from src.database import Base


class AbstractSerializer(ABC):

    @abstractmethod
    def to_dict(self, obj: Base) -> dict: ...

    @abstractmethod
    def from_dict(self, data: dict, model: type[Base]) -> Base: ...

    @abstractmethod
    def serialize(self, obj: Base, schema: type[BaseModel]) -> BaseModel: ...

    @abstractmethod
    def serialize_many(self, objects: Iterable[Base], schema: type[BaseModel]) -> list[BaseModel]: ...

    @abstractmethod
    def deserialize(self, data: BaseModel, model: type[Base]) -> Base: ...


class Serializer(AbstractSerializer):
    def to_dict(self, obj: Base) -> dict:
        return obj.__dict__

    def from_dict(self, data: dict, model: type[Base]) -> Base:
        return model(**data)

    def serialize(self, obj: Base, schema: type[BaseModel]) -> BaseModel:
        return schema.model_validate(self.to_dict(obj))

    def serialize_many(self, objects: Iterable[Base], schema: type[BaseModel]) -> list[BaseModel]:
        result = []
        for obj in objects:
            result.append(self.serialize(obj, schema))

        return result

    def deserialize(self, data: BaseModel, model: type[Base]) -> Base:
        return self.from_dict(data.model_dump(), model)

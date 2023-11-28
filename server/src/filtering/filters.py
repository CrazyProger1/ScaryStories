from abc import ABC, abstractmethod


class Filter(ABC):

    @property
    @abstractmethod
    def filters(self) -> list: ...

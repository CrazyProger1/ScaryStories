from abc import ABC, abstractmethod


class Sorter(ABC):

    @property
    @abstractmethod
    def sorts(self) -> list: ...

from src.sorting import Sorter
from sqlalchemy import asc, desc
from .models import Story


class StorySorter(Sorter):
    def __init__(self, views: str = None):
        self.views = views

    @property
    def sorts(self) -> list:
        sorts = []

        if self.views == 'asc':
            sorts.append(asc(Story.views))
        elif self.views == 'desc':
            sorts.append(desc(Story.views))

        return sorts

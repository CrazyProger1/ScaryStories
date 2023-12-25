from src.filtering import Filter
from .models import Story


class StoryFilter(Filter):
    def __init__(self, category_id: int = None, author_id: int = None):
        self.category_id = category_id
        self.author_id = author_id

    @property
    def filters(self) -> list:
        filters = []
        if self.category_id is not None:
            filters.append(Story.category_id == self.category_id)

        if self.author_id is not None:
            filters.append(Story.author_id == self.author_id)

        return filters

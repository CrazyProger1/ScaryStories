from src.filtering import Filter
from .models import Story


class StoryFilter(Filter):
    def __init__(self, category_id: int = None):
        self.category_id = category_id

    @property
    def filters(self) -> list:
        if self.category_id is not None:
            return [Story.category_id == self.category_id]
        else:
            return []

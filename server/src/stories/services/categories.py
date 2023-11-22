from src.repository import AbstractRepository


class CategoryService:
    def __init__(self, category_repository: AbstractRepository):
        self.category_repository = category_repository

    def read_categories(self):
        print(self.category_repository, 'HELLO')

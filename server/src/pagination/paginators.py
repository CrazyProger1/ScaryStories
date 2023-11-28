from abc import ABC, abstractmethod

from .schemas import PaginatedResponseSchema


class Paginator(ABC):
    limit: int
    offset: int

    @abstractmethod
    def form_response(self, results: list, **kwargs) -> PaginatedResponseSchema: ...


class DefaultPaginator(Paginator):
    def __init__(self, limit: int | None = None, offset: int | None = None):
        self.limit = limit
        self.offset = offset

    def form_response(self, results: list, **kwargs):
        return PaginatedResponseSchema.model_validate({
            'results': results,
            'limit': self.limit,
            'offset': self.offset,
            'total': kwargs.pop('total', None)
        })

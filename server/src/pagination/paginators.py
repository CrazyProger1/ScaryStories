from .schemas import DefaultPaginatedResponseSchema


class DefaultPaginator:
    def __init__(self, limit: int | None = None, offset: int | None = None):
        self.limit = limit
        self.offset = offset

    def form_response(self, results: list, total: int) -> DefaultPaginatedResponseSchema:
        return DefaultPaginatedResponseSchema.model_validate({
            'results': results,
            'limit': self.limit,
            'offset': self.offset,
            'total': total
        })

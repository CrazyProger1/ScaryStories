from .schemas import DefaultPaginatedResponseSchema


class DefaultPaginator:
    def __init__(self, limit: int = 0, offset: int = 0):
        self.limit = limit
        self.offset = offset

    def form_response(self, results: list) -> DefaultPaginatedResponseSchema:
        return DefaultPaginatedResponseSchema.model_validate({
            'results': results,
            'limit': self.limit,
            'offset': self.offset
        })

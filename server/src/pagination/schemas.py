from pydantic import BaseModel, Field


class PaginatedResponseSchema(BaseModel):
    results: list
    total: int | None
    limit: int | None = Field(0)
    offset: int | None = Field(0)

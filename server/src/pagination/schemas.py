from pydantic import BaseModel, Field


class DefaultPaginatedResponseSchema(BaseModel):
    results: list
    total: int
    limit: int | None = Field(0)
    offset: int | None = Field(0)

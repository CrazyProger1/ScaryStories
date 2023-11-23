from pydantic import BaseModel, Field


class DefaultPaginatedResponseSchema(BaseModel):
    results: list
    total: int
    limit: int = Field(0)
    offset: int = Field(0)

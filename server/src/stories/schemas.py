from pydantic import BaseModel


class CategorySchema(BaseModel):
    name: str


class StoryReadSchema(BaseModel):
    pass


class StoryCreateSchema(BaseModel):
    name: str
    story: str
    creator_id: int
    category_name: CategorySchema

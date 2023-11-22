import datetime

from pydantic import BaseModel, Field

from src.auth.schemas import (
    UserReadSchema
)
from src.stories.constants import (
    CATEGORY_NAME_LENGTH,
    STORY_NAME_LENGTH,
    STORY_LENGTH
)


class CategoryReadSchema(BaseModel):
    id: int
    name: str = Field(max_length=CATEGORY_NAME_LENGTH)
    picture_url: str = Field(None)


class CategoryCreateUpdateSchema(BaseModel):
    name: str = Field(max_length=CATEGORY_NAME_LENGTH)


class StoriesReadSchema(BaseModel):
    id: int
    name: str
    author: UserReadSchema
    category: CategoryReadSchema
    rating: float
    read_time: float
    views: int
    comments_number: int
    created_date: datetime.datetime
    picture_url: str = Field(None)


class StoryReadSchema(BaseModel):
    id: int
    name: str
    story: str
    author: UserReadSchema
    category: CategoryReadSchema
    rating: float
    read_time: float
    comments_number: int
    created_date: datetime.datetime
    views: int
    picture_url: str = Field(None)


class StoryUpdateSchema(BaseModel):
    name: str = Field(max_length=STORY_NAME_LENGTH)
    story: str = Field(max_length=STORY_LENGTH)


class StoryCreateSchema(BaseModel):
    name: str = Field(max_length=STORY_NAME_LENGTH)
    story: str = Field(max_length=STORY_LENGTH)
    category_id: int

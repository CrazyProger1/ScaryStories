from pydantic import BaseModel, Field

from src.stories.constants import (
    STORY_LENGTH,
    STORY_NAME_LENGTH,
    CATEGORY_NAME_LENGTH,
    COMMENT_LENGTH
)


class StoriesReadSchema(BaseModel):
    id: int
    name: str
    creator_id: int
    category_name: str


class StoryReadSchema(BaseModel):
    id: int
    name: str
    story: str
    creator_id: int
    category_name: str


class StoryUpdateSchema(BaseModel):
    name: str = Field(max_length=STORY_NAME_LENGTH)
    story: str = Field(max_length=STORY_LENGTH)


class StoryCreateSchema(BaseModel):
    name: str = Field(max_length=STORY_NAME_LENGTH)
    story: str = Field(max_length=STORY_LENGTH)
    category_name: str


class CategorySchema(BaseModel):
    name: str = Field(max_length=CATEGORY_NAME_LENGTH)


class VoteWriteSchema(BaseModel):
    vote: int = Field(ge=0, le=5)


class VoteReadSchema(BaseModel):
    story_id: int
    user_id: int
    vote: int


class Rating(BaseModel):
    story_id: int
    rating: float


class CommentWriteSchema(BaseModel):
    comment: str = Field(max_length=COMMENT_LENGTH)


class CommentReadSchema(BaseModel):
    id: int
    story_id: int
    user_id: int
    comment: str


class CommentUpdateSchema(BaseModel):
    comment: str = Field(max_length=COMMENT_LENGTH)

from pydantic import BaseModel


class StoryReadSchema(BaseModel):
    id: int
    name: str
    story: str
    creator_id: int
    category_name: str


class StoryCreateSchema(BaseModel):
    name: str
    story: str
    category_name: str


class StoryCategorySchema(BaseModel):
    name: str


class StoryRatingVoteWriteSchema(BaseModel):
    vote: int


class StoryRatingVoteReadSchema(BaseModel):
    story_id: int
    user_id: int
    vote: int


class StoryRating(BaseModel):
    story_id: int
    rating: float


class StoryCommentWriteSchema(BaseModel):
    comment: str


class StoryCommentReadSchema(BaseModel):
    story_id: int
    user_id: int
    comment: str

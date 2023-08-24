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


class StoryRatingVoteSchema(BaseModel):
    story_id: int
    user_id: int
    vote: int


class StoryCommentSchema(BaseModel):
    story_id: int
    user_id: int
    comment: str

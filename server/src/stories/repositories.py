from sqlalchemy import insert
from src.database import async_session_maker

from src.repository import SQLAlchemyRepository
from src.stories.models import Story, StoryCategory, StoryRatingVote, StoryComment


class StoriesRepository(SQLAlchemyRepository):
    model = Story


class StoryCategoriesRepository(SQLAlchemyRepository):
    model = StoryCategory


class StoryVotesRepository(SQLAlchemyRepository):
    model = StoryRatingVote


class StoryCommentsRepository(SQLAlchemyRepository):
    model = StoryComment

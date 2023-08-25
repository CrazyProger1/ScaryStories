import sqlalchemy as db

from src.database import Base
from src.auth.models import User


class Story(Base):
    __tablename__ = 'stories'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    story = db.Column(db.String, nullable=False)
    creator_id = db.Column(db.Integer, db.ForeignKey(User.id))
    category_name = db.Column(db.String, db.ForeignKey('story_categories.name'))


class StoryCategory(Base):
    __tablename__ = 'story_categories'

    name = db.Column(db.String, primary_key=True)


class StoryRatingVote(Base):
    __tablename__ = 'story_rating_votes'

    story_id = db.Column(db.Integer, db.ForeignKey('stories.id'), primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(User.id), primary_key=True)
    vote = db.Column(db.String, nullable=False)


class StoryComments(Base):
    __tablename__ = 'story_comments'

    story_id = db.Column(db.Integer, db.ForeignKey('stories.id'), primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(User.id), primary_key=True)
    comment = db.Column(db.String, nullable=False)

import sqlalchemy as db

from src.database import Base
from src.auth.models import User


class Story(Base):
    __tablename__ = 'stories'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    story = db.Column(db.String, nullable=False)
    creator_id = db.Column(db.Integer, db.ForeignKey(User.id, ondelete='SET NULL'), nullable=True)
    category_id = db.Column(db.Integer, db.ForeignKey('story_categories.id', onupdate='CASCADE'))


class StoryCategory(Base):
    __tablename__ = 'story_categories'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False, unique=True)


class StoryRatingVote(Base):
    __tablename__ = 'story_rating_votes'

    story_id = db.Column(db.Integer, db.ForeignKey('stories.id', ondelete='CASCADE'), primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(User.id, ondelete='CASCADE'), primary_key=True)
    vote = db.Column(db.Integer, nullable=False)


class StoryComment(Base):
    __tablename__ = 'story_comments'

    id = db.Column(db.Integer, primary_key=True)
    story_id = db.Column(db.Integer, db.ForeignKey('stories.id', ondelete='CASCADE'))
    user_id = db.Column(db.Integer, db.ForeignKey(User.id, ondelete='CASCADE'))
    comment = db.Column(db.String, nullable=False)

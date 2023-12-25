import datetime

import sqlalchemy as db
from sqlalchemy.orm import relationship

from src.database import Base
from src.auth.models import User


class Category(Base):
    __tablename__ = 'story_categories'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False, unique=True)
    picture_url = db.Column(db.String, nullable=True)

    stories = relationship('Story', back_populates='category')


class Story(Base):
    __tablename__ = 'stories'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    story = db.Column(db.String, nullable=False)
    author_id = db.Column(db.Integer, db.ForeignKey(User.id, ondelete='SET NULL'), nullable=True)
    category_id = db.Column(db.Integer, db.ForeignKey('story_categories.id', onupdate='CASCADE'))
    create_date = db.Column(db.Date, default=datetime.datetime.utcnow)
    views = db.Column(db.Integer, default=0)
    picture_url = db.Column(db.String, nullable=True)

    category = relationship('Category', back_populates='stories')
    author = relationship('User')

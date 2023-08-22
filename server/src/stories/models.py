import sqlalchemy as db
from src.auth.models import User

metadata = db.MetaData()

story = db.Table(
    'story',
    metadata,
    db.Column('id', db.Integer, primary_key=True),
    db.Column('name', db.String, nullable=False),
    db.Column('story', db.String, nullable=False),
    db.Column('creator_id', db.ForeignKey(User.id)),
    db.Column('category_name', db.ForeignKey('story_category.name'))
)

story_category = db.Table(
    'story_category',
    metadata,
    db.Column('name', db.String, primary_key=True)
)

story_rating_vote = db.Table(
    'story_rating_vote',
    metadata,
    db.Column('story_id', db.ForeignKey(User.id), nullable=False),
    db.Column('user_id', db.ForeignKey(User.id), nullable=False),
    db.Column('vote', db.Integer, nullable=False)
)

story_comment = db.Table(
    'story_comment',
    metadata,
    db.Column('story_id', db.ForeignKey('story.id'), nullable=False),
    db.Column('user_id', db.ForeignKey(User.id), nullable=False),
    db.Column('comment', db.String, nullable=False)
)

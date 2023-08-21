from datetime import datetime

import sqlalchemy as db

metadata = db.MetaData()

user = db.Table(
    'user',
    metadata,
    db.Column('id', db.Integer, primary_key=True),
    db.Column('username', db.String, unique=True, nullable=False),
    db.Column('email', db.String, unique=True, nullable=False),
    db.Column('password', db.String, nullable=False),
    db.Column('registered_at', db.TIMESTAMP, default=datetime.utcnow)
)

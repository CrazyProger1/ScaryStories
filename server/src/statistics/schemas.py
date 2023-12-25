from pydantic import BaseModel


class UserStatisticsReadSchema(BaseModel):
    stories_number: int
    views_number: int

from functools import cache
from src.stories.constants import READ_TIME_IN_CHARS_PER_MIN


@cache
def get_read_time_min(story: str) -> float:
    return len(story) / READ_TIME_IN_CHARS_PER_MIN

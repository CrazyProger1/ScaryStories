from typing import Iterable

import uvicorn
from fastapi import FastAPI, APIRouter

from src.auth.routers import routers as auth_routers
from src.stories.routers import routers as stories_routers

app = FastAPI()


def include_routers(routers: Iterable[APIRouter], tags: list[str], prefix: str):
    for router in routers:
        app.include_router(
            router,
            prefix=prefix,
            tags=tags
        )


include_routers(auth_routers, tags=['Auth'], prefix='/auth')
include_routers(stories_routers, tags=['Stories'], prefix='/stories')

if __name__ == '__main__':
    uvicorn.run(
        app=app
    )

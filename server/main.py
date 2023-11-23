from typing import Iterable

import uvicorn
from fastapi import FastAPI, APIRouter
from starlette.middleware.cors import CORSMiddleware

from src.auth.routers import routers as auth_routers
from src.stories.routers import routers as stories_routers
from src.config import APP, VERSION
from src.middlewares import catch_exceptions_middleware

app = FastAPI(
    title=APP,
    version=VERSION
)


def include_routers(routers: Iterable[APIRouter], tags: list[str], prefix: str):
    for router in routers:
        app.include_router(
            router,
            prefix=prefix,
            tags=tags
        )


include_routers(auth_routers, tags=['Users App'], prefix='/users')
include_routers(stories_routers, tags=['Stories App'], prefix='/stories')

# app.middleware('http')(catch_exceptions_middleware)
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

if __name__ == '__main__':
    uvicorn.run(
        app=app
    )

from fastapi import FastAPI

from auth.routers import routers
from stories.routers import router as stories_router

app = FastAPI()

for router in routers:
    app.include_router(
        router,
        prefix='/auth',
        tags=['Auth']
    )

app.include_router(
    stories_router,
    prefix='/stories',
    tags=['Stories']
)

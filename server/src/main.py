from fastapi import FastAPI

from auth.routers import routers

app = FastAPI()

for router in routers:
    app.include_router(
        router,
        prefix='/auth',
        tags=['Auth']
    )

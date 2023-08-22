from fastapi import FastAPI

from auth.router import router as auth_router

app = FastAPI()

app.include_router(
    auth_router,
    prefix='/auth',
    tags=['Auth']
)

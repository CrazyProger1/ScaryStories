from fastapi import APIRouter

router = APIRouter(
    prefix='/auth'
)


@router.get('/')
async def hello_auth():
    return 'Hello, auth!'

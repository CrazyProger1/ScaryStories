from fastapi import APIRouter

from .schemas import UserSchema


router = APIRouter()


@router.get('/')
async def get_users():
    return 'Users'


@router.get('/{pk}')
async def get_user(pk: int):
    return f'User, {pk}'


@router.get('/me')
async def get_me():
    pass


@router.post('/')
async def create_user(user: UserSchema):
    pass

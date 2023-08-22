from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from auth.models import User
from stories.dependencies import current_user
from stories.schemas import StoryCreateSchema, StoryReadSchema
from stories.services import get_all_stories, create_story as create_st
from database import get_async_session

router = APIRouter()


@router.get('/', response_model=list[StoryReadSchema])
async def get_stories(user: User = Depends(current_user), session: AsyncSession = Depends(get_async_session)):
    return await get_all_stories(session=session)


@router.post('/')
async def create_story(story: StoryCreateSchema, session: AsyncSession = Depends(get_async_session)):
    return await create_st(session=session, story_=story)

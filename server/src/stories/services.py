import sqlalchemy.exc
from pydantic import BaseModel
from fastapi import HTTPException

from src.auth.models import User
from src.repository import AbstractRepository
from src.serializer import AbstractSerializer
from src.stories.schemas import (
    StoryCreateSchema,
    StoriesReadSchema,
    CategorySchema,
    VoteWriteSchema,
    VoteReadSchema,
    CommentWriteSchema,
    CommentReadSchema,
    Rating,
    StoryReadSchema, StoryUpdateSchema, CommentUpdateSchema, VoteUpdateSchema
)
from src.stories.models import (
    StoryComment,
    StoryRatingVote,
    Story,
    StoryCategory
)
from src.stories.enums import ErrorMessages


class StoriesService:
    def __init__(self, repository: type[AbstractRepository], serializer: type[AbstractSerializer]):
        self.repository = repository()
        self.serializer = serializer()

    async def get_story_or_404(self, story_id: int) -> Story:
        story = await self.repository.read_one(Story.id == story_id)
        if not story:
            raise HTTPException(status_code=404, detail=ErrorMessages.NOT_FOUND)
        return story

    async def is_story_owner_or_superuser_or_403(self, story: Story, owner: User):
        if story.creator_id != owner.id and not owner.is_superuser:
            raise HTTPException(status_code=403, detail=ErrorMessages.NO_PERMISSION)

    async def read_stories(self, limit: int = None, offset: int = None) -> list[BaseModel]:
        return self.serializer.serialize_many(await self.repository.read(limit=limit, offset=offset), StoriesReadSchema)

    async def read_story(self, story_id: int):
        story = await self.repository.read_one(Story.id == story_id)

        if story:
            return self.serializer.serialize(story, StoryReadSchema)
        raise HTTPException(status_code=404, detail=ErrorMessages.NOT_FOUND)

    async def create_story(self, story: StoryCreateSchema, creator: User) -> StoriesReadSchema:
        try:
            story_id = await self.repository.create(creator_id=creator.id, **story.model_dump())
        except sqlalchemy.exc.IntegrityError:
            raise HTTPException(status_code=403, detail=ErrorMessages.CATEGORY_NOT_FOUND)
        data = {
            'id': story_id,
            'creator_id': creator.id,
            **story.model_dump()
        }
        return StoriesReadSchema.model_validate(data)

    async def update_story(self, story_id: int, story: StoryUpdateSchema, user: User):
        story_obj = await self.get_story_or_404(story_id=story_id)
        await self.is_story_owner_or_superuser_or_403(story=story_obj, owner=user)
        await self.repository.update(Story.id == story_id, **story.model_dump())

    async def delete_story(self, story_id: int, user: User):
        story = await self.get_story_or_404(story_id=story_id)
        await self.is_story_owner_or_superuser_or_403(story=story, owner=user)
        await self.repository.delete(Story.id == story_id)


class CategoriesService:
    def __init__(self, repository: type[AbstractRepository], serializer: type[AbstractSerializer]):
        self.repository = repository()
        self.serializer = serializer()

    async def category_exist_or_404(self, name: str):
        if not await self.repository.exists(StoryCategory.name == name):
            raise HTTPException(status_code=404, detail=ErrorMessages.NOT_FOUND)

    async def category_not_exist_or_403(self, name: str):
        if await self.repository.exists(StoryCategory.name == name):
            raise HTTPException(status_code=403, detail=ErrorMessages.CATEGORY_ALREADY_EXISTS)

    async def read_categories(self):
        return self.serializer.serialize_many(await self.repository.read(), CategorySchema)

    async def create_category(self, category: CategorySchema) -> CategorySchema:
        await self.category_not_exist_or_403(name=category.name)
        name = await self.repository.create(**category.model_dump())
        return CategorySchema(name=name)

    async def delete_category(self, name: str):
        await self.repository.delete(StoryCategory.name == name)

    async def update_category(self, name: str, category: CategorySchema):
        await self.category_exist_or_404(name=name)
        await self.repository.update(StoryCategory.name == name, **category.model_dump())


class VotesService:
    def __init__(self, repository: type[AbstractRepository], serializer: type[AbstractSerializer]):
        self.repository = repository()
        self.serializer = serializer()

    async def get_vote_or_404(self, story_id: int, user_id: int) -> StoryRatingVote:
        vote = await self.repository.read_one(
            StoryRatingVote.story_id == story_id,
            StoryRatingVote.user_id == user_id
        )
        if not vote:
            raise HTTPException(status_code=404, detail=ErrorMessages.NOT_FOUND)
        return vote

    async def vote_not_exists_or_403(self, story_id: int, user_id: int):
        if await self.repository.exists(StoryRatingVote.story_id == story_id, StoryRatingVote.user_id == user_id):
            raise HTTPException(status_code=403, detail=ErrorMessages.ALREADY_VOTED)

    async def create_vote(
            self,
            vote: VoteWriteSchema,
            creator: User,
            story_id: int
    ) -> VoteReadSchema:
        data = vote.model_dump()
        try:
            await self.vote_not_exists_or_403(story_id=story_id, user_id=creator.id)
            await self.repository.create(returning_fields=None, **data, user_id=creator.id, story_id=story_id)
        except sqlalchemy.exc.IntegrityError:
            raise HTTPException(status_code=403, detail=ErrorMessages.NOT_FOUND)

        return VoteReadSchema(
            **data,
            user_id=creator.id,
            story_id=story_id
        )

    async def get_rating(self, story_id: int) -> Rating:
        rating = 0
        count = 0
        for vote in await self.repository.read(StoryRatingVote.story_id == story_id):
            rating += vote.vote
            count += 1

        return Rating.model_validate({
            'story_id': story_id,
            'rating': (rating / count) if count > 0 else 0
        })

    async def read_my_vote(self, story_id: int, user: User):
        vote = await self.get_vote_or_404(user_id=user.id, story_id=story_id)
        return self.serializer.serialize(vote, VoteReadSchema)

    async def update_vote(self, vote: VoteUpdateSchema, user: User, story_id: int):
        await self.get_vote_or_404(user_id=user.id, story_id=story_id)
        await self.repository.update(
            StoryRatingVote.story_id == story_id,
            StoryRatingVote.user_id == user.id,
            **vote.model_dump()
        )

    async def delete_vote(self, user: User, story_id: int):
        await self.get_vote_or_404(user_id=user.id, story_id=story_id)
        await self.repository.delete(
            StoryRatingVote.story_id == story_id,
            StoryRatingVote.user_id == user.id
        )


class CommentsService:
    def __init__(self, repository: type[AbstractRepository], serializer: type[AbstractSerializer]):
        self.repository = repository()
        self.serializer = serializer()

    async def get_comment_or_404(self, comment_id: int) -> StoryComment:
        comment = await self.repository.read_one(StoryComment.id == comment_id)
        if not comment:
            raise HTTPException(status_code=404, detail=ErrorMessages.NOT_FOUND)
        return comment

    async def is_comment_owner_or_superuser_or_403(self, comment: StoryComment, owner: User):
        if not comment.user_id == owner.id and not owner.is_superuser:
            raise HTTPException(status_code=403, detail=ErrorMessages.NO_PERMISSION)

    async def read_comments(self, story_id: int, limit: int = None, offset: int = None):
        return self.serializer.serialize_many(
            await self.repository.read(
                StoryComment.story_id == story_id,
                limit=limit,
                offset=offset
            ),
            CommentReadSchema
        )

    async def create_comment(
            self,
            comment: CommentWriteSchema,
            creator: User,
            story_id: int
    ) -> CommentReadSchema:
        data = comment.model_dump()
        try:
            comment_id = await self.repository.create(**data, user_id=creator.id, story_id=story_id)
        except sqlalchemy.exc.IntegrityError:
            raise HTTPException(status_code=403, detail=ErrorMessages.STORY_NOT_FOUND)

        return CommentReadSchema(
            **data,
            user_id=creator.id,
            story_id=story_id,
            id=comment_id
        )

    async def update_comment(
            self,
            comment_id: int,
            comment: CommentUpdateSchema,
            user: User
    ):
        comment_obj = await self.get_comment_or_404(comment_id=comment_id)
        await self.is_comment_owner_or_superuser_or_403(comment_obj, user)
        await self.repository.update(StoryComment.id == comment_id, **comment.model_dump())

    async def delete_comment(self, comment_id: int, user: User):
        comment_obj = await self.get_comment_or_404(comment_id=comment_id)
        await self.is_comment_owner_or_superuser_or_403(comment_obj, user)
        await self.repository.delete(StoryComment.id == comment_id)

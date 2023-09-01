from fastapi import Request, Response
from loguru import logger

from src.config import DEBUG


async def catch_exceptions_middleware(request: Request, call_next):
    try:
        return await call_next(request)
    except Exception as e:
        logger.exception(str(e))
        if DEBUG:
            raise e
        return Response('Internal server error', status_code=500)

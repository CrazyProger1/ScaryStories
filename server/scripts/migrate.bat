mkdir "./alembic/versions"

alembic revision --autogenerate -m "initial"

alembic upgrade head
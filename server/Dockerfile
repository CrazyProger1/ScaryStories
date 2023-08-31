FROM python:3.11

RUN mkdir /scary_stories

WORKDIR /scary_stories

COPY requirements/prod.txt .

RUN pip install -r prod.txt

COPY . .

RUN alembic upgrade head

CMD gunicorn main:app --workers 1 --worker-class uvicorn.workers.UvicornWorker



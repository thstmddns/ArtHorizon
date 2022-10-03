FROM python:3.10

WORKDIR /prod

COPY ./require.txt /prod/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /prod/requirements.txt

COPY ./app /prod/app

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
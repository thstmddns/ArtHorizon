FROM python:3.10

WORKDIR /prod

COPY ./require.txt /prod/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /prod/requirements.txt

COPY ./app /prod/app

RUN apt-get update
RUN apt-get -y install libgl1-mesa-glx

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
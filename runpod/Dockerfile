from python:3.11.1-buster

WORKDIR /

RUN pip install runpod

RUN pip install torch

RUN pip install transformers

RUN pip install numpy

RUN pip install Flask

ADD handler.py .

CMD [ "python", "-u", "/handler.py" ]
FROM python:3.9.6-slim-buster

COPY ./lookdiscoverer/requirements.txt /

VOLUME /usr/src/app

ENV LANG C.UTF-8
ENV LC_ALL C.UTF-8

EXPOSE 8000

RUN pip install -r /requirements.txt
# Install mongodb.
RUN apt-get update -y
RUN apt-get upgrade -y
RUN apt-get install wget gnupg procps -y
RUN wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | apt-key add -
RUN echo "deb http://repo.mongodb.org/apt/debian buster/mongodb-org/4.4 main" | tee /etc/apt/sources.list.d/mongodb-org-4.4.list
RUN apt-get update -y
RUN apt-get install -y mongodb-org
RUN mkdir -p /data/db
RUN printf "dbpath = /data \nport = 27017 \nlogpath = /mongod.log" > /mongod.conf

# Start mongodb service, create the database and the user then start the app.
CMD mongod -f /mongod.conf --fork && \
    mongo --eval "db.getSiblingDB('locald').createUser({ user: 'locald', pwd: 'locald', roles: [{ role: 'readWrite', db: 'locald'}]});" && \
    mongoimport --db locald --collection resources_look --drop --file looks_with_md5s.ndjson && \
    python manage.py migrate && \
    python manage.py createsuperuser --no-input &&\
    python manage.py runserver 0:8000

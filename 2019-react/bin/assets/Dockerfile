FROM ubuntu:latest

ARG HOST_UID
ARG HOST_GID

# general packages
RUN apt-get update
RUN apt-get -y upgrade
RUN apt-get install -y curl nano wget

# react binaries
RUN apt-get install -y npm
RUN npm cache clean -f
RUN npm install -g n
RUN n stable
RUN npm -g install create-react-app

# Install the autoexec script, to be ran with every container start.
COPY autoexec.sh /usr/bin/
RUN chmod +x /usr/bin/autoexec.sh

# create group
RUN if [ ${HOST_GID} -eq 0 ]; then echo 'Environment variable HOST_GID must be set. Exiting.'; exit 1; fi
RUN \
    export CONTAINER_GROUPNAME=$(cat /etc/group | grep ":$HOST_GID:" | cut -d ":" -f 1) && \
    if [ -z "$CONTAINER_GROUPNAME" ]; then groupadd --gid ${HOST_GID} todomodo; fi

# create user
RUN if [ ${HOST_UID} -eq 0 ]; then echo 'Environment variable USER_ID must be set. Exiting.'; exit 1; fi
RUN useradd --create-home --no-user-group --shell /bin/bash --gid ${HOST_GID} --uid ${HOST_UID} todomodo

# create the application directory
RUN mkdir -p /usr/src
RUN chown --changes --silent --no-dereference --recursive ${HOST_UID}:${HOST_GID} /usr/src

# switch to the newly created user
USER todomodo

# copy the app dir into the image, in case we want to run it without a mounted source
COPY ../../app /usr/src/app

# Expose port 3000
EXPOSE 3000

ENTRYPOINT ["autoexec.sh"]
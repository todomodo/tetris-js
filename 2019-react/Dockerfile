#
# Build with all defaults:
#   docker build --tag tetjs-rapidant .
#
# Build with custom host platform:
#   docker build --tag tetjs-rapidant --build-arg HOST_PLATFORM=arm64v8/ubuntu .
#   docker build --tag tetjs-rapidant --build-arg HOST_PLATFORM=amd64/ubuntu .
#
# Build with custom HOST_UID/$HOST_GID:
#   docker build --tag tetjs-rapidant --build-arg HOST_UID=$HOST_UID --build-arg HOST_GID=$HOST_GID .
#
# Run with interractive bash
#   docker run -it -v $PWD/app:/usr/src/app tetjs-rapidant bash
#
# Run with command line
#   docker run --rm -v $PWD/app:/usr/src/app tetjs-rapidant [command line]
#
ARG HOST_PLATFORM=ubuntu

FROM ${HOST_PLATFORM}:latest

# Docker arguments
ARG HOST_UID=0
ARG HOST_GID=0

# local environment variables
ENV \
    APP_ROOT=/usr/src/app \
    APP_NAME="tetris" \
    USER_NAME="todomodo"

# general packages
RUN apt-get update
RUN apt-get -y upgrade
RUN apt-get install -y curl nano wget npm lsb-release

# install react packages
RUN npm cache clean -f
RUN npm install -g n
RUN n stable
RUN npm -g install create-react-app

# create group
RUN if [ ${HOST_GID} -eq 0 ]; \
    then \
      echo "Argument HOST_GID not set, using default group" >> /build.log; \
    else \
      echo "Argument HOST_GID=${HOST_GID}" >> /build.log; \
      export CONTAINER_GROUPNAME=$(cat /etc/group | grep ":$HOST_GID:" | cut -d ":" -f 1) && \
      if [ -z "$CONTAINER_GROUPNAME" ]; \
        then groupadd --gid ${HOST_GID} $USER_NAME; \
      fi; \
    fi


# create user
RUN if [ ${HOST_UID} -eq 0 ]; \
    then \
      echo "Argument HOST_UID not set, creating with default group" >> /build.log; \
      useradd --create-home --shell /bin/bash --uid ${HOST_UID} $USER_NAME; \
    else \
      echo "Argument HOST_UID=${HOST_UID}" >> /build.log; \
      useradd --create-home --no-user-group --shell /bin/bash --gid ${HOST_GID} --uid ${HOST_UID} $USER_NAME; \
    fi

# Install the entrypoint
COPY bin/assets/entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh

# Install the app locally, in case we descide to not use mapped drives
COPY app $APP_ROOT
RUN chown --changes --silent --no-dereference --recursive ${HOST_UID}:${HOST_GID} $APP_ROOT

# switch to the newly created user
USER $USER_NAME

# show APP_NAME on command prompt
RUN echo >> /home/$USER_NAME/.bashrc
RUN echo "PS1='\[\033[01;32m\]\${debian_chroot:+(\$debian_chroot)}\u@${APP_NAME}\[\033[00m\]:\w\$ '" >> /home/$USER_NAME/.bashrc


# Expose port 3000
EXPOSE 3000

ENTRYPOINT ["entrypoint.sh"]

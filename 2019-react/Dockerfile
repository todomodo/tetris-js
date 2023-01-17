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

# general OS packages
RUN apt-get update
RUN apt-get -y upgrade
RUN apt-get install -y curl nano wget npm lsb-release

# install react packages
RUN npm cache clean -f
RUN npm install -g n
RUN n stable
RUN npm -g install create-react-app

# create new user
RUN useradd --create-home --shell /bin/bash ${USER_NAME}

# Install the app
COPY app $APP_ROOT
RUN chown --changes --silent --no-dereference --recursive ${USER_NAME} $APP_ROOT

# Install the entrypoint script
COPY bin/assets/entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh

# switch to the newly created user
USER $USER_NAME
WORKDIR /home/$USER_NAME

# show APP_NAME on command prompt
RUN echo >> /home/$USER_NAME/.bashrc
RUN echo "PS1='\[\033[01;32m\]\${debian_chroot:+(\$debian_chroot)}\u@${APP_NAME}\[\033[00m\]:\w\$ '" >> /home/$USER_NAME/.bashrc

# Expose port 3000
EXPOSE 3000

ENTRYPOINT ["entrypoint.sh"]
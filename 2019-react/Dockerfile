FROM ubuntu:latest

# general packages
RUN apt-get update
RUN apt-get upgrade
RUN apt-get install -y curl nano wget

# react binaries
RUN apt-get install -y npm
RUN npm cache clean -f
RUN npm install -g n
RUN n stable
RUN npm -g install create-react-app

# copy the app dir into the image
RUN mkdir /root/app
COPY ./app /root/app/

# Expose port 3000
EXPOSE 3000

# Install the autoexec script, to be ran with every container start.
COPY ./misc/autoexec.sh /usr/bin/
RUN chmod +x /usr/bin/autoexec.sh
ENTRYPOINT ["autoexec.sh"]
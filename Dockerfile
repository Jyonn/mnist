FROM ubuntu:17.10

RUN \
  apt-get update && \
  apt-get upgrade -y && \
  apt-get install -y git python3-pip

ARG sth=LATEST
RUN sth=${sth} git clone https://github.com/lqj679ssn/mnist.git
WORKDIR mnist/
RUN pip3 install --upgrade pip
RUN pip3 install -r requirements.txt

ENTRYPOINT python3 server.py

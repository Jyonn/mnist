FROM ubuntu

RUN \
  apt-get update && \
  apt-get upgrade -y && \
  apt-get install -y git python3 python3-pip

RUN git clone https://github.com/lqj679ssn/mnist.git
WORKDIR mnist/
RUN pip3 install --upgrade pip
RUN pip3 install -r requirements.txtr

ENTRYPOINT ["FLASK_APP=server.py", "flask", "run"]
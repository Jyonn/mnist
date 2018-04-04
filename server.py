import json

import os
from flask import Flask, render_template, request

app = Flask(__name__)


@app.route('/')
def handwriting():
    return render_template('index.html')


@app.route('/api/detect', methods=['POST'])
def detect():
    image = json.loads(request.data)['image']
    result = os.popen('python3 predict.py "%s"' % image)
    r = result.read()
    result.close()
    return r


if __name__ == '__main__':
    app.run(host='0.0.0.0')

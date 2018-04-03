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
    result = os.popen('python predict.py "%s"' % image)
    r = result.read()
    result.close()
    return r

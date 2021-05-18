from flask import Flask, request

app = Flask(__name__)

link_token = None


@app.route('/api/link_token', methods=['POST'])
def set_link_token():
    global link_token
    link_token = request.json['data']['link_token']
    return 'link token set'

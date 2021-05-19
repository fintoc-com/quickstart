from datetime import date
from fintoc import Client
from flask import Flask, request, jsonify
import os

app = Flask(__name__)

client = Client(os.environ['SECRET_KEY'])
link_token = None


@app.route('/api/link_token', methods=['POST'])
def set_link_token():
    global link_token
    link_token = request.json['data']['link_token']
    return 'link token set'


@app.route('/api/accounts', methods=['GET'])
def get_accounts():
    def transform_account(account):
        return {
            'id': account.id_,
            'name': account.name,
            'holderName': account.holder_name,
            'currency': account.currency,
            'balance':  {
                'available': account.balance.available,
                'current': account.balance.current,
            }
        }
    link = client.get_link(link_token)
    return jsonify([transform_account(account) for account in link])


@app.route('/api/accounts/<account_id>/movements', methods=['GET'])
def get_account_movements(account_id):
    def transform_movement(movement):
        return {
            'id': movement.id_,
            'postDate': movement.post_date.isoformat(),
            'amount': movement.amount,
            'currency': movement.currency,
            'description': movement.description,
        }
    current_month = date.today().replace(day=1)
    link = client.get_link(link_token)
    account = link.find(id_=account_id)
    movements = account.get_movements(since=current_month)
    return jsonify([transform_movement(movement) for movement in movements])

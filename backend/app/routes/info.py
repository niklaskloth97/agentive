from flask import Blueprint, current_app

infoBP = Blueprint('info', __name__)
# Define Routes for  Management
@infoBP.route('/', methods=['GET'])
def info():
    print("Hello, Print!")
    return "<p>Hello, Flask!</p>"
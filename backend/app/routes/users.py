from flask import request, jsonify, Blueprint, current_app
#from app import user, db, app

loginBP = Blueprint('login', __name__)

@loginBP.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    # Process the login data (e.g., authenticate user)
    # For demonstration, we'll just return a success response
    if email == 'test@example.com' and password == 'password':
        return jsonify({'success': True})
    else:
        return jsonify({'success': False, 'error': 'Invalid credentials'})

registrBP = Blueprint('registr', __name__)

@registrBP.route('/register', methods=['POST'])
def registr():
    data = request.get_json()
    fullName = data.get('fullName')
    email = data.get('email')
    password = data.get('password')
    confirm_password = data.get('confirmPassword')

    # Process the registration data (e.g., create new user)
    if password == confirm_password:
        # Assume registration is successful
        return jsonify({'success': True})
    else:
        return jsonify({'success': False, 'error': 'Passwords do not match'})

userBP = Blueprint('register', __name__)

@userBP.route('/user/<int:id>', methods=['GET'])
def get_user(id):
    # Retrieve user from the database
    user = User.query.get(id)
    if not user:
        return jsonify({"message": "User not found"}), 404
    return jsonify({"username": user.username, "email": user.email})
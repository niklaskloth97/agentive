from flask import request, jsonify
from app import User
from app import app, db

# Routes for User
@app.route('/user', methods=['POST'])
def add_user():
    # Get data from the request
    data = request.json
    username = data.get('username')
    email = data.get('email')
    # Add user to the database
    new_user = User(username=username, email=email)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User added successfully"}), 201

@app.route('/login', methods=['POST'])
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

@app.route('/register', methods=['POST'])
def register():
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

@app.route('/user/<int:id>', methods=['GET'])
def get_user(id):
    # Retrieve user from the database
    user = User.query.get(id)
    if not user:
        return jsonify({"message": "User not found"}), 404
    return jsonify({"username": user.username, "email": user.email})

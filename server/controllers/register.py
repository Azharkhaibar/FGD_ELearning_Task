from flask import Blueprint, request, jsonify
from models.registermodels import Register, db

register_bp = Blueprint('register', __name__)

@register_bp.route('/register', methods=['POST'])
def register_user():
    data = request.get_json()
    if not data or not all(key in data for key in ('firstname', 'lastname', 'username', 'email', 'password')):
        return jsonify({'message': 'Missing required fields'}), 400
    existing_user = Register.query.filter((Register.username == data['username']) | (Register.email == data['email'])).first()
    if existing_user:
        return jsonify({'message': 'Username or email already exists'}), 400
    new_user = Register(
        firstname=data['firstname'],
        lastname=data['lastname'],
        username=data['username'],
        email=data['email']
    )
    new_user.set_password(data['password'])  
    
    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'message': 'User registered successfully!'}), 201
    except Exception as e:
        db.session.rollback()  
        return jsonify({'message': 'Error saat Register'}), 500

@register_bp.route('/register', methods=['GET'])
def get_all_users():
    users = Register.query.all()
    return jsonify([user.register_json() for user in users]), 200

@register_bp.route('/register/<int:id>', methods=['GET'])
def get_user_by_id(id):
    user = Register.query.get(id)
    if user:
        return jsonify(user.register_json()), 200
    return jsonify({'message': 'User tidak ditemukan'}), 404

@register_bp.route('/register/<int:id>', methods=['DELETE'])
def delete_user(id):
    user = Register.query.get(id)
    if user:
        db.session.delete(user)
        db.session.commit()
        return jsonify({'message': 'User deleted successfully!'}), 200
    return jsonify({'message': 'User not found'}), 404

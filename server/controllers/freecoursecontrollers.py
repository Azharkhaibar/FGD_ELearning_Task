from flask import Blueprint, request, jsonify
from sqlalchemy.exc import IntegrityError
from config.config import db
from models.formcoursemodels import CourseForm

course_bp = Blueprint('course', __name__)

@course_bp.route('/participants', methods=['GET'])
def get_participants():
    participants = CourseForm.query.all()
    return jsonify([participant.course_participate_json() for participant in participants])

@course_bp.route('/participants/<int:id>', methods=['GET'])
def get_participant_by_id(id):
    participant = CourseForm.query.get(id)
    if participant:
        return jsonify(participant.course_participate_json())
    return jsonify({"message": "Participant not found"}), 404

@course_bp.route('/participants', methods=['POST'])
def post_participant():
    data = request.get_json()

    if not data.get('name') or not data.get('email') or not data.get('phone_number'):
        return jsonify({"message": "All fields are required."}), 400

    new_participant = CourseForm(
        name=data['name'],
        email=data['email'],
        phone_number=data['phone_number']
    )
    
    try:
        db.session.add(new_participant)
        db.session.commit()
        return jsonify(new_participant.course_participate_json()), 201
    except IntegrityError:
        db.session.rollback()
        return jsonify({"message": "This email is already registered."}), 409  
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), 500  

@course_bp.route('/participants/<int:id>', methods=['DELETE'])
def delete_participant(id):
    participant = CourseForm.query.get(id)
    if participant:
        db.session.delete(participant)
        db.session.commit()
        return jsonify({"message": "Participant deleted"}), 200
    return jsonify({"message": "Participant not found"}), 404

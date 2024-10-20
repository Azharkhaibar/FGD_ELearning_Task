from flask import Flask
from flask_cors import CORS
from config.config import db
from controllers.register import register_bp
from controllers.freecoursecontrollers import course_bp
import os

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URL", "mysql+pymysql://root:@localhost/elearning")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# CORS configuration
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

db.init_app(app)

app.register_blueprint(register_bp)
app.register_blueprint(course_bp)

with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug=True, port=4001)

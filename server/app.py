from flask import Flask
from flask_cors import CORS
from config.config import db
from controllers.register import register_bp
import os  # Impor os untuk mengakses variabel lingkungan

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URL", "mysql+pymysql://root:@localhost/elearning")  # Menggunakan variabel lingkungan
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

CORS(app)  # Menambahkan dukungan CORS

db.init_app(app)



# Daftarkan blueprint
app.register_blueprint(register_bp)

# Buat tabel di database jika belum ada
with app.app_context():
    db.create_all()

# Jalankan server
if __name__ == '__main__':
    app.run(debug=True, port=5001)  # Ubah debug=True untuk pengembangan

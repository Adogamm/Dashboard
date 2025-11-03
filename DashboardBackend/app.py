from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

app = Flask(__name__)
CORS(app)

app.config['JWT_SECRET_KEY'] = 'DesarrolloDashboard'
jwt = JWTManager(app)
users = {
    "admin": generate_password_hash('admin123')
}

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if username in users and check_password_hash(users[username], password):
        token = create_access_token(identity=username)
        print(f"Usuario {username} ha iniciado sesión.")
        return jsonify({"message": "Login exitoso", "token": token})
    return jsonify({"message": "Credenciales inválidas"}), 401

@app.route('/dashboard', methods=['GET'])
@jwt_required()
def dashboard():
    user = get_jwt_identity()
    return jsonify({"message": f"Bienvenido al dashboard, {user}!"})

if __name__ == '__main__':
    app.run(debug=True)
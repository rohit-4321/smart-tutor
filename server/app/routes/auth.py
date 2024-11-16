import datetime
from flask import jsonify, redirect, session, url_for, make_response, request
from functools import wraps
from app.routes import main

from firebase_admin import auth



@main.route("/login", methods=['POST'])
def google_auth_callback():
    id_token = str(request.json['token'])
    expires_in = datetime.timedelta(days=5)
    try:
        session_cookie = auth.create_session_cookie(id_token, expires_in=expires_in)
        decoded_claim = auth.verify_session_cookie(session_cookie)
        session['user_info'] = {
            "name": decoded_claim["name"],
            "id": decoded_claim["user_id"],
            "auth_time": decoded_claim["auth_time"],
            "email": decoded_claim["email"],
            "exp": decoded_claim["exp"],
            "picture": decoded_claim["picture"]
        }
        return jsonify({'result': 'success'}), 200
    except Exception as e:
        print(str(e))
        return jsonify({'error': f"Server Error Auth: {str(e)}"}), 500;




def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_info' not in session:
            return jsonify({'result': 'unauthorized'}), 401
        return f(*args, **kwargs)
    return decorated_function




@main.route("/userInfo")
@login_required
def get_user_info():
    if "user_info" in session:
        data = session['user_info']
        return jsonify({"result": data}), 200
    
    return jsonify({'result': 'unauthorized'}), 401


@main.route("/logout")
@login_required
def log_out():
    session.clear()
    return jsonify({'result': 'true'}), 200




@main.route("/ping")
def ping_pong():
    return jsonify({'result': 'pong..'}), 200
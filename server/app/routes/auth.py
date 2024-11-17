import datetime
from flask import jsonify, redirect, session, url_for, make_response, request, g
from functools import wraps
from app.routes import main
from firebase_admin import auth

@main.route("/login", methods=['POST'])
def google_auth_callback():
    id_token = str(request.json['token'])
    expires_in = datetime.timedelta(days=2)
    try:
        session_cookie = auth.create_session_cookie(id_token, expires_in=expires_in)        
        response = jsonify({'result': 'success', 'token': session_cookie})
        return response

    except Exception as e:
        print(str(e))
        return jsonify({'error': f"Server Error Auth: {str(e)}"}), 500




def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return jsonify({'result': 'Unauthorized, token missing'}), 401
        token = auth_header.split(' ')[1] if len(auth_header.split()) == 2 else None
        if not token:
            return jsonify({'result': 'Unauthorized, invalid token format'}), 401
        try:
            decoded_claim = auth.verify_session_cookie(token, check_revoked=True)
            
            user_info = {
                "name": decoded_claim["name"],
                "id": decoded_claim["user_id"],
                "email": decoded_claim["email"],
                "picture": decoded_claim.get("picture")
            }
            
            g.user_info = user_info
            
            return f(*args, **kwargs)
        
        except auth.ExpiredIdTokenError:
            return jsonify({'error': 'Unauthorized: Token has expired'}), 401
        except auth.RevokedIdTokenError:
            return jsonify({'error': 'Unauthorized: Token has been revoked'}), 401
        except Exception as e:
            return jsonify({'error': f"Unauthorized: {str(e)}"}), 401

    return decorated_function




@main.route("/userInfo")
@login_required
def get_user_info():
    custom_data = g.get('user_info', None)
    return jsonify({"result": custom_data, "hello": "WORD"}), 200

        


# @main.route("/logout")
# @login_required
# def log_out():
#     # session.clear()
#     return response




@main.route("/ping")
def ping_pong():
    return jsonify({'result': 'pong..%'}), 200
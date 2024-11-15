from flask import jsonify, redirect, session, url_for, make_response, request
from flask_dance.contrib.google import google
from functools import wraps
from app.routes import main

@main.route("/google_auth_callback")
def google_auth_callback():
    if not google.authorized:
        return redirect(url_for("google.login"))
    
    referer = request.headers.get('Referer', 'No Referer')
    if referer == 'No Referer':
        return jsonify({"result": "unkown_client_url"}), 401
    
    resp = google.get("/oauth2/v1/userinfo")
    assert resp.ok, resp.text
    user_info = resp.json();

    session["user_info"] = user_info
    redirect_url = f"{referer}quiz"

    return redirect(redirect_url)


def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not google.authorized:
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
    return jsonify({'result': 'pong'}), 200
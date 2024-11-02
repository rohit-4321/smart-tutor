from flask import jsonify, redirect, session, url_for, make_response, request
from flask_dance.contrib.google import google
from functools import wraps
from app.routes import main

@main.route("/google_auth_callback")
def google_auth_callback():
    if not google.authorized:
        return redirect(url_for("google.login"))

    resp = google.get("/oauth2/v1/userinfo")
    assert resp.ok, resp.text
    user_info = resp.json();

    session["user_info"] = user_info
    return redirect('http://localhost:5173/home')


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
    return jsonify({'result': 'unauthorized'}), 401
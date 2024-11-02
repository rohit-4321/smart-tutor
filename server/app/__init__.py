from flask import Flask
from config import Config
from flask_pymongo import PyMongo
from flask_cors import CORS
from flask_dance.contrib.google import make_google_blueprint
import os;

mongo = PyMongo();
db = mongo.db

def create_app():
    app = Flask(__name__)
    CORS(app, supports_credentials=True, origins=["http://localhost:5173"])

    app.config.from_object(Config)
    app.secret_key = os.getenv("SECRET_KEY")

    mongo.init_app(app)

    #Register routes
    from .routes import main
    app.register_blueprint(main)


    google_bp = make_google_blueprint(
        redirect_to="main.google_auth_callback",
        scope=["profile", "email"]
    )
    app.register_blueprint(google_bp, url_prefix="/login")


    
    
    return app


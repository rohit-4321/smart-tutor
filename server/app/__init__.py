from flask import Flask
from config import Config
from flask_pymongo import PyMongo
from flask_cors import CORS
from flask_dance.contrib.google import make_google_blueprint
from os import getenv
from openai import OpenAI
import os;

mongo = PyMongo();
db = mongo.db

# AI Client
SAMBANOVA_API_KEY = getenv("SAMBANOVA_API_KEY")

ai_client = OpenAI(
    base_url="https://api.sambanova.ai/v1",
    api_key=SAMBANOVA_API_KEY
)

def create_app():
    app = Flask(__name__)
    CORS(app, supports_credentials=True, origins="*")

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


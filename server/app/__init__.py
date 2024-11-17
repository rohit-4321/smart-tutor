from flask import Flask
from config import Config
from flask_pymongo import PyMongo
from flask_cors import CORS
from os import getenv
from openai import OpenAI
import firebase_admin
from firebase_admin import credentials
import os;

mongo = PyMongo();
db = mongo.db

# AI Client
SAMBANOVA_API_KEY = getenv("SAMBANOVA_API_KEY")

ai_client = OpenAI(
    base_url="https://api.sambanova.ai/v1",
    api_key=SAMBANOVA_API_KEY
)


firebaseCred = {
    "type": "service_account",
    "project_id": getenv("FIREBASE_project_id"),
    "private_key_id": getenv("FIREBASE_private_key_id"),
    "private_key": getenv("FIREBASE_private_key").replace('\\n', '\n'),
    "client_email": "firebase-adminsdk-zd27c@smart-tutor-c1502.iam.gserviceaccount.com",
    "client_id": getenv("FIREBASE_client_id"),
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-zd27c%40smart-tutor-c1502.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
};





def create_app():
    app = Flask(__name__)
    CORS(app, supports_credentials=True, origins=["http://localhost:5173", "https://smart-tutor-client.vercel.app"], 
         methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"], 
         allow_headers=["Content-Type", "Authorization", "Access-Control-Allow-Origin"])
    
    app.config.from_object(Config)
    app.secret_key = os.getenv("SECRET_KEY")
    mongo.init_app(app)

    #Register routes
    from .routes import main
    app.register_blueprint(main)

    #Firebase
    cred = credentials.Certificate(firebaseCred)
    firebase_admin.initialize_app(cred)

    return app


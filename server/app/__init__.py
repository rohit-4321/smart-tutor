from flask import Flask
from config import Config
from flask_pymongo import PyMongo
from flask_cors import CORS
from openai import OpenAI

mongo = PyMongo();
db = mongo.db

def create_app():
    app = Flask(__name__)
    CORS(app)

    app.config.from_object(Config)

    mongo.init_app(app)

    #Register routes
    from .routes import main
    app.register_blueprint(main)
    
    return app


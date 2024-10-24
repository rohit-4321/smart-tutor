import os
from flask import Blueprint
from . import mongo
main = Blueprint('main', __name__)

@main.route('/')
def hello():
    mongo.db.users.insert_one(document= {"name": "Ronak", "user_id": "23213k21b3j"});
    return "Hello World.."
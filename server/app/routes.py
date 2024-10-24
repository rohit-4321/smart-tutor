import os
from flask import Blueprint
from . import mongo
main = Blueprint('main', __name__)

@main.route('/')
def hello():
    return "Hello World.."
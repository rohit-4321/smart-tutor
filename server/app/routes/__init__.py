from flask import Blueprint
main = Blueprint('main', __name__)

from .quiz import *
from .auth import *
from .flashCard import *
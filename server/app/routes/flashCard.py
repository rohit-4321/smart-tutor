from flask import request, jsonify, current_app, session
from app.modals.quiz import insertQuiz, getAllQuizTopicWithId, db_update_quiz, db_get_quiz_by_id
from pymongo.errors import PyMongoError
from app.routes import main
from os import getenv
from openai import OpenAI

from app.routes.auth import login_required
from app.modals.flashCard import db_get_decks, db_insert_deck
from schema.flashCard import CreateFlashCardPayload

@main.route('/createFlashCardDeck', methods=['POST'])
@login_required
def createFlashCard():
    try:
        user_id = session['user_info']['id']
        payload = CreateFlashCardPayload(**request.json)
        result = db_insert_deck(payload.model_dump(), user_id);
    
        return jsonify({
            'result': str(result.inserted_id),
        }), 200
    except PyMongoError as e:
        print(str(e))
        return jsonify({"error": f'Database Error: {str(e)}'}), 500
    except Exception as e:
        print(str(e))
        return jsonify({'error': f"Server Error: {str(e)}"}), 500;




@main.route('/decks')
@login_required
def decks():
    try:
        user_id = session['user_info']['id']
        result = db_get_decks(user_id);
    
        return jsonify({
            'result': result
        }), 200
    except PyMongoError as e:
        print(str(e))
        return jsonify({"error": f'Database Error: {str(e)}'}), 500
    except Exception as e:
        print(str(e))
        return jsonify({'error': f"Server Error: {str(e)}"}), 500;




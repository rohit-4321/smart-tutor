from time import sleep
from flask import request, jsonify, current_app, session
from app.modals.quiz import insertQuiz, getAllQuizTopicWithId, db_update_quiz, db_get_quiz_by_id
from pymongo.errors import PyMongoError
from app.routes import main
from os import getenv
from openai import OpenAI

from app.routes.auth import login_required
from app.modals.flashCard import db_get_decks, db_insert_deck, db_add_card, db_get_cards, db_update_card
from schema.flashCard import CreateFlashCardPayload , AddCardPayload

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


@main.route('/deck/addcard/<deck_id>', methods=['PUT'])
@login_required
def addCard(deck_id):
    try:
        user_id = session['user_info']['id']
        card = AddCardPayload(**request.json)
        result = db_add_card(user_id=user_id, card=card.model_dump(), deck_id=deck_id)
        return jsonify({
            'result': result.upserted_id
        }), 200
    except PyMongoError as e:
        print(str(e))
        return jsonify({"error": f'Database Error: {str(e)}'}), 500
    except Exception as e:
        print(str(e))
        return jsonify({'error': f"Server Error: {str(e)}"}), 500;

@main.route('/deck/cards/<deck_id>')
@login_required
def getCards(deck_id):
    try:
        user_id = session['user_info']['id']
        result = db_get_cards(user_id=user_id, deck_id=deck_id)
        del result['_id']
        return jsonify({
            'result': result
        }), 200
    except PyMongoError as e:
        print(str(e))
        return jsonify({"error": f'Database Error: {str(e)}'}), 500
    except Exception as e:
        print(str(e))
        return jsonify({'error': f"Server Error: {str(e)}"}), 500;



@main.route('/deck/card/update/<deck_id>/<card_id>', methods=['PUT'])
@login_required
def updateCard(deck_id, card_id):
    try:
        user_id = session['user_info']['id'];
        card = AddCardPayload(**request.json)
        print(card_id, deck_id)
        result = db_update_card(user_id=user_id, deck_id=deck_id, card_id=card_id, card=card.model_dump() )
        return jsonify({
            'result': result.modified_count
        }), 200
    except PyMongoError as e:
        print(str(e))
        return jsonify({"error": f'Database Error: {str(e)}'}), 500
    except Exception as e:
        print(str(e))
        return jsonify({'error': f"Server Error: {str(e)}"}), 500;

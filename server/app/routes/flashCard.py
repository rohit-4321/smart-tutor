
# Third-Party Imports
from flask import request, jsonify, g
from pymongo.errors import PyMongoError
from openai import OpenAI

# Local Application Imports
from app import ai_client
from app.routes import main
from app.routes.auth import login_required
from app.modals.flashCard import (
    db_get_decks, db_insert_deck, db_update_deck_name_and_description, 
    db_add_card, db_get_cards, db_update_card, db_update_deck_score, 
    db_delete_deck, db_delete_card, db_get_deck_name_description
)
from app.prompt import system_prompt_flash_card, get_flash_card_input
from schema.flashCard import (
    CreateFlashCardPayload, AddCardPayload, UpdateDeckNamePayload, 
    UpdateDeckResultPayload, FlashCardAIResponseSchema
)
@main.route('/createFlashCardDeck', methods=['POST'])
@login_required
def createFlashCard():
    try:
        user_id = (g.get('user_info', None))['id']
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
        user_id = (g.get('user_info', None))['id']
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
        user_id = (g.get('user_info', None))['id']
        card = AddCardPayload(**request.json)
        result = db_add_card(user_id=user_id, cards=[card.model_dump()], deck_id=deck_id)
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
        user_id = (g.get('user_info', None))['id']
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
        user_id = (g.get('user_info', None))['id'];
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




@main.route('/deck/update/<deck_id>', methods=['PUT'])
@login_required
def update_deck_name_and_description(deck_id):
    try:
        user_id = (g.get('user_info', None))['id'];
        deck_info = UpdateDeckNamePayload(**request.json)
        result = db_update_deck_name_and_description(user_id=user_id, deck_id=deck_id, deck_info=deck_info.model_dump())
        return jsonify({
            'result': result.modified_count
        }), 200
    except PyMongoError as e:
        print(str(e))
        return jsonify({"error": f'Database Error: {str(e)}'}), 500
    except Exception as e:
        print(str(e))
        return jsonify({'error': f"Server Error: {str(e)}"}), 500;




@main.route('/deck/updateScore/<deck_id>', methods=['PUT'])
@login_required
def update_deck_score(deck_id):
    try:
        user_id = (g.get('user_info', None))['id'];
        temp = UpdateDeckResultPayload(**request.json)
        print(request.json);
        result = db_update_deck_score(user_id=user_id, deck_id=deck_id, payload=temp.model_dump() )
        return jsonify({
            'result': result.modified_count
        }), 200
    except PyMongoError as e:
        print(str(e))
        return jsonify({"error": f'Database Error: {str(e)}'}), 500
    except Exception as e:
        print(str(e))
        return jsonify({'error': f"Server Error: {str(e)}"}), 500;



@main.route('/deck/delete/<deck_id>', methods=["DELETE"])
@login_required
def delete_deck(deck_id):
    try:
        user_id = (g.get('user_info', None))['id'];
        result = db_delete_deck(user_id=user_id, deck_id=deck_id)
        return jsonify({
            'result': result.deleted_count
        }), 200
    except PyMongoError as e:
        print(str(e))
        return jsonify({"error": f'Database Error: {str(e)}'}), 500
    except Exception as e:
        print(str(e))
        return jsonify({'error': f"Server Error: {str(e)}"}), 500;


@main.route('/deck/card/delete/<deck_id>/<card_id>', methods=['DELETE'])
@login_required
def delete_card(deck_id, card_id):
    try:
        user_id = (g.get('user_info', None))['id'];
        result = db_delete_card(user_id=user_id, deck_id=deck_id, card_id=card_id)
        return jsonify({
            'result': result.modified_count
        }), 200
    except PyMongoError as e:
        print(str(e))
        return jsonify({"error": f'Database Error: {str(e)}'}), 500
    except Exception as e:
        print(str(e))
        return jsonify({'error': f"Server Error: {str(e)}"}), 500;




@main.route('/deck/card/aigenerate/<deck_id>', methods=['PUT'])
@login_required
def ai_generate_flash_card(deck_id):
    try:
        user_id = (g.get('user_info', None))['id'];
        document = db_get_deck_name_description(deck_id=deck_id, user_id=user_id)
        # Check Document  
        if not document or 'name' not in document or 'description' not in document:
            return jsonify({'error': f"Server Errord: {str(e)}"}), 500;
    
        # print(get_flash_card_input(name=document.name, description=document.description))
        completion = ai_client.chat.completions.create(
            model="Meta-Llama-3.1-70B-Instruct",
            messages = [
                {"role": "system", "content": system_prompt_flash_card},
                {"role": "user", "content": get_flash_card_input(name=document['name'], description=document['description'])}
                ],
        )
        chat_response = completion.model_dump();        
        content = chat_response['choices'][0]['message']['content'];
        data = FlashCardAIResponseSchema.model_validate_json(content);
        data = data.model_dump();

        result = db_add_card(user_id=user_id, cards=data['cards'], deck_id=deck_id)
        
        return jsonify({'result': {
            '_id': result.upserted_id,
            'cards_count': len(data['cards'])
        } }), 200
    except PyMongoError as e:
        print(str(e))
        return jsonify({"error": f'Database Error: {str(e)}'}), 500
    except Exception as e:
        print(str(e))
        return jsonify({'error': f"Server Error: {str(e)}"}), 500;
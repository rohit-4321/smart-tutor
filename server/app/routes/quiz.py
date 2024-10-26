from flask import request, jsonify, current_app
from marshmallow import Schema, fields, ValidationError
from app.modals.groups import create_group, get_all_groups
from pymongo.errors import PyMongoError
from app.routes import main
from typing import List
from os import getenv
from openai import OpenAI


# Validation
class CreateQuizSchema(Schema):
    topic_name = fields.Str(required=True)
    question_type = fields.List(fields.Str(), required=True)
    no_of_questions = fields.Int(required=True, validate=lambda x: x > 0)
create_quiz_schema = CreateQuizSchema()


SAMBANOVA_API_KEY = getenv("SAMBANOVA_API_KEY")
client = OpenAI(
    base_url="https://api.sambanova.ai/v1",
    api_key=SAMBANOVA_API_KEY
)

@main.route('/createQuiz', methods=['POST'])
def createGroup():
    try:
        data = create_quiz_schema.load(request.json)
        completion = client.chat.completions.create(
            model="Meta-Llama-3.1-405B-Instruct",
            messages = [
                {"role": "system", "content": "Answer the question in a couple sentences."},
                {"role": "user", "content": "Share a happy story with me with only 10 words"}
                ],
        )
        
        return jsonify({'result': completion.to_json() }), 200
    
    except PyMongoError as e:
        return jsonify({"error": f'Database Error: {str(e)}'}), 500
    
    except ValidationError as err:
        return jsonify({
            "message": "Validation Error",
            "errors": err.messages,  # Shows field errors and types
            "valid_fields": err.valid_data  # Shows fields that passed validation
        }), 400
    except Exception as e:
        return jsonify({'error': f"Server Error: {str(e)}"}), 500;



@main.route('/groups')
def getGroups():
    try:
        result = get_all_groups()
        result = result.to_list();
        list = [];

        for group in result:
            group['_id'] = str(group['_id'])
            list.append(group);
            
        return jsonify({
            'result': list
        }), 200

    except PyMongoError as e:
        return jsonify({"error": f'Database Error: {str(e)}'}), 500
    except Exception as e:
        return jsonify({'error': f"Server Error: {str(e)}"}), 500;
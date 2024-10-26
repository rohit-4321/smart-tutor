from flask import request
from flask import request, jsonify
from marshmallow import Schema, fields, ValidationError
from app.modals.groups import create_group, get_all_groups
from pymongo.errors import PyMongoError
from app.routes import main
from typing import List

class CreateQuizSchema(Schema):
    topic_name = fields.Str(required=True)
    question_type = fields.List(fields.Str(), required=True)
    no_of_questions = fields.Int(required=True, validate=lambda x: x > 0)


create_quiz_schema = CreateQuizSchema()

@main.route('/createQuiz', methods=['POST'])
def createGroup():
    try:
        data = create_quiz_schema.load(request.json)
        print(data);
        return jsonify({'result': data }), 200
    
    except PyMongoError as e:
        return jsonify({"error": f'Database Error: {str(e)}'}), 500
    
    except ValidationError as err:
        # Return detailed validation error information
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
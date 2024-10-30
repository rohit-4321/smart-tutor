from flask import request, jsonify, current_app
from app.modals.quiz import insertQuiz, getAllQuizTopicWithId, db_update_quiz, db_get_quiz_by_id
from pymongo.errors import PyMongoError
from app.routes import main
from os import getenv
from openai import OpenAI
import os
import json
from app.prompt import system_prompt

from schema.quiz import CreateQuizSchema, Quiz, QuizDBCollecction

# AI Client
SAMBANOVA_API_KEY = getenv("SAMBANOVA_API_KEY")

client = OpenAI(
    base_url="https://api.sambanova.ai/v1",
    api_key=SAMBANOVA_API_KEY
)


@main.route('/createQuiz', methods=['POST'])
def createGroup():
    try:
        payload = CreateQuizSchema(**request.json)
        completion = client.chat.completions.create(
            model="Meta-Llama-3.1-8B-Instruct",
            messages = [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": payload.model_dump_json()}
                ],
        )
        chat_response = completion.model_dump();
        print(str(chat_response));

        
        content = chat_response['choices'][0]['message']['content'];
        
        quiz_data = Quiz.model_validate_json(content)
        result = insertQuiz(quiz_data.model_dump())
        
        return jsonify({'result': {
            '_id': str(result.inserted_id),
            'quiz': quiz_data.model_dump() 
        } }), 200
    
    except PyMongoError as e:
        print(str(e))
        return jsonify({"error": f'Database Error: {str(e)}'}), 500
    except Exception as e:
        print(str(e))
        return jsonify({'error': f"Server Error: {str(e)}"}), 500;



@main.route('/allTopics')
def getQuizTopic():
    result = getAllQuizTopicWithId()

    return jsonify({
        'result': result
    }), 200


@main.route('/updateQuiz/<_id>', methods=['PUT'])
def updateQuiz(_id):
    try:
        payload_quiz = request.json
        
        data = Quiz(**payload_quiz)

        count = db_update_quiz(str(_id), data)
        if count > 0:
            return jsonify({'result': "Updated Successfully"}), 200
        else:
            return jsonify({'error': f'No _id match document in db.'}), 304
        
    except PyMongoError as e:
        print(str(e))
        return jsonify({"error": f'Database Error: {str(e)}'}), 500
    except Exception as e:
        print(str(e))
        return jsonify({'error': f"Server Error: {str(e)}"}), 500; 


@main.route('/quiz/<_id>')
def getQuiz(_id):
    try:
        result = db_get_quiz_by_id(str(_id))
        db_result = QuizDBCollecction(**result);
        return jsonify({
            'result': {
                'quiz': db_result.quiz.model_dump(),
                "_id": str(_id),
                "last_updated_at": db_result.last_updated_at,
                "created_at": db_result.created_at
            }
        }), 200
    except PyMongoError as e:
        print(str(e))
        return jsonify({"error": f'Database Error: {str(e)}'}), 500
    except Exception as e:
        print(str(e))
        return jsonify({'error': f"Server Error: {str(e)}"}), 500;  


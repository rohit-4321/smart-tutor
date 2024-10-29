from flask import request, jsonify, current_app
from app.modals.quiz import insertQuiz, getAllQuizTopicWithId
from pymongo.errors import PyMongoError
from app.routes import main
from os import getenv
from openai import OpenAI
import os
import json
from app.prompt import system_prompt

from schema.quiz import CreateQuizSchema, Quiz

# AI Client
SAMBANOVA_API_KEY = getenv("SAMBANOVA_API_KEY")

client = OpenAI(
    base_url="https://api.sambanova.ai/v1",
    api_key=SAMBANOVA_API_KEY
)

create_quiz_schema = CreateQuizSchema()


def load_quiz_data():
    file_path = os.path.join('schema', 'newQuiz.json')
    with open(file_path, 'r') as file:
        quiz_data = json.load(file)
    return quiz_data

@main.route('/createQuiz', methods=['POST'])
def createGroup():
    try:
        # payload = create_quiz_schema.load(request.json)
        json_response = load_quiz_data();
        data = Quiz(**json_response);
        # result = insertQuiz(data.model_dump())
        # completion = client.chat.completions.create(
        #     model="Meta-Llama-3.1-405B-Instruct",
        #     messages = [
        #         {"role": "system", "content": "Answer the question in a couple sentences."},
        #         {"role": "user", "content": "Share a happy story with me with only 10 words"}
        #         ],
        # )
        
        return jsonify({'result': {
            '_id': '671f38d6c1c67815e6896a31',
            'quiz': data.model_dump() 
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


# Standard Library Imports
from flask import request, jsonify, current_app, session
from pymongo.errors import PyMongoError

# Third-Party Imports
from app import ai_client

# Local Application Imports
from app.routes import main
from app.routes.auth import login_required
from app.modals.quiz import insertQuiz, getAllQuizTopicWithId, db_update_quiz, db_get_quiz_by_id
from app.prompt import system_prompt_3
from schema.quiz import CreateQuizSchema, Quiz, QuizDBCollecction

@main.route('/createQuiz', methods=['POST'])
@login_required
def createGroup():
    try:
        user_id = session['user_info']['id']
        payload = CreateQuizSchema(**request.json)
        completion = ai_client.chat.completions.create(
            model="Meta-Llama-3.1-70B-Instruct",
            messages = [
                {"role": "system", "content": system_prompt_3},
                {"role": "user", "content": payload.model_dump_json()}
                ],
        )
        chat_response = completion.model_dump();        
        content = chat_response['choices'][0]['message']['content'];
        quiz_data = Quiz.model_validate_json(content);
        result = insertQuiz(quiz_data.model_dump(), user_id)
        
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
@login_required
def getQuizTopic():
    result = getAllQuizTopicWithId(session['user_info']['id'])
    return jsonify({
        'result': result
    }), 200


@main.route('/updateQuiz/<_id>', methods=['PUT'])
@login_required
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
@login_required
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


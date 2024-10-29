from app import mongo
from schema.quiz import Quiz
def insertQuiz(quiz: Quiz):
    result = mongo.db.quizzes.insert_one(quiz)
    return result


def getAllQuizTopicWithId():
    pipeline = [
        {
            "$project": {
                "_id": { "$toString": "$_id" },
                "topic": 1
            }
        }
    ]
    result = list(mongo.db.quizzes.aggregate(pipeline));
    return result

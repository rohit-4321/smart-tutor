from app import mongo
from schema.quiz import Quiz
from bson import ObjectId
from datetime import datetime, timezone

def insertQuiz(quiz: Quiz):

    result = mongo.db.quizzes.insert_one({
        "quiz": quiz,
        "created_at": datetime.now(timezone.utc),
        "last_updated_at": datetime.now(timezone.utc)
    })
    return result


def getAllQuizTopicWithId():
    pipeline = [
        {
            "$project": {
                "_id": { "$toString": "$_id" },
                "topic": "$quiz.topic"
            }
        }
    ]
    result = list(mongo.db.quizzes.aggregate(pipeline));
    return result


def db_update_quiz(document_id: str, quiz: Quiz):


    document_id = ObjectId(document_id)

    result = mongo.db.quizzes.update_one(
        {"_id": document_id},
        {"$set": {
        "quiz": quiz.model_dump(),
        "last_updated": datetime.now(timezone.utc)
    }}
    )

    # If result.modified_count greater that 0 than update successfully otherwise not update
    return result.matched_count;


def db_get_quiz_by_id(_id: str):

    data = mongo.db.quizzes.find_one({"_id": ObjectId(_id)})

    data["_id"] = str(data["_id"]) 
    return data
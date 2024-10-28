from app import mongo
from schema.quiz import Quiz
def insertQuiz(quiz: Quiz):
    result = mongo.db.quizzes.insert_one(quiz)
    return result

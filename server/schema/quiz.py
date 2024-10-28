from marshmallow import Schema, fields
from typing import Literal, List
from pydantic import BaseModel

class CreateQuizSchema(Schema):
    topic_name = fields.Str(required=True)
    question_type = fields.List(fields.Str(), required=True)
    no_of_questions = fields.Int(required=True, validate=lambda x: x > 0)

create_quiz_schema = CreateQuizSchema()


# Ai reponse Schema
class Question(BaseModel):
    question_type: Literal["single_choice", "multiple_choice"]
    question: str
    correct_answer: List[int]
    options: List[str]
    description: str
    user_answer: List[int] = []

class Quiz(BaseModel):
    topic: str
    total_no_of_questions: int
    questions: List[Question]
    status: Literal["draft", "completed"] = "draft"
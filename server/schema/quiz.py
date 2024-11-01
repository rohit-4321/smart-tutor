from typing import Literal, List
from pydantic import BaseModel, Field
from datetime import datetime

class CreateQuizSchema(BaseModel):
    topic:str
    question_types: List[Literal["single_choice", "multiple_choice"]]
    no_of_questions: int = Field(..., gt=0, lt=20) 



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


class QuizDBCollecction(BaseModel):
    _id: str = None
    quiz: Quiz
    created_at: datetime
    last_updated_at: datetime
